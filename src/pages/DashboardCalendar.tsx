import { DashboardLayout } from '../components/DashboardLayout';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, X, Users, Video, Mail as MailIcon, Clock, MapPin } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';
import { actorsAPI, crewAPI, projectsAPI, emailAPI, companiesAPI } from '../utils/filmlot-api';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DashboardCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Event creation popup state
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [eventType, setEventType] = useState<'meeting' | 'audition'>('meeting');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('09:00');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventProject, setEventProject] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  
  // Data from API
  const [actors, setActors] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  // Quick add contact state
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddType, setQuickAddType] = useState<'actor' | 'crew'>('actor');
  const [quickAddName, setQuickAddName] = useState('');
  const [quickAddEmail, setQuickAddEmail] = useState('');
  const [quickAddPhone, setQuickAddPhone] = useState('');
  const [quickAddRole, setQuickAddRole] = useState('');
  const [savingContact, setSavingContact] = useState(false);

  const supabase = createClient();
  const navigate = useNavigate();

  useEffect(() => {
    checkGoogleCalendarConnection();
    loadContacts();
  }, []);

  const checkGoogleCalendarConnection = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.provider_token) {
        // User has a provider token from Google OAuth
        setIsGoogleCalendarConnected(true);
      }
    } catch (error) {
      console.error('Error checking Google Calendar connection:', error);
    }
  };

  const handleConnectGoogleCalendar = async () => {
    try {
      setIsConnecting(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events',
          redirectTo: `${window.location.origin}/dashboard/calendar`
        }
      });

      if (error) throw error;

      toast.success('Redirecting to Google Calendar authorization...');
    } catch (error: any) {
      console.error('Error connecting to Google Calendar:', error);
      toast.error('Failed to connect to Google Calendar. Please ensure Google OAuth is configured in Supabase settings.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectGoogleCalendar = async () => {
    try {
      setIsGoogleCalendarConnected(false);
      toast.success('Google Calendar disconnected');
    } catch (error: any) {
      console.error('Error disconnecting Google Calendar:', error);
      toast.error('Failed to disconnect Google Calendar');
    }
  };

  // Get calendar data
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  
  // Generate calendar days
  const calendarDays = [];
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }
  
  // Next month days
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    return day === selectedDate.getDate() && 
           month === selectedDate.getMonth() && 
           year === selectedDate.getFullYear();
  };

  const formatSelectedDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[selectedDate.getDay()]}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}`;
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const [actorsResponse, crewResponse, projectsResponse, companiesResponse] = await Promise.all([
        actorsAPI.getAll(),
        crewAPI.getAll(),
        projectsAPI.getAll(),
        companiesAPI.getAll(),
      ]);
      
      console.log('Actors API Response:', actorsResponse);
      console.log('Crew API Response:', crewResponse);
      
      setActors(actorsResponse.actors || []);
      setCrew(crewResponse.crew || []);
      setProjects(projectsResponse.projects || []);
      setCompanies(companiesResponse.companies || []);
      
      console.log('Actors state updated:', actorsResponse.actors || []);
      console.log('Crew state updated:', crewResponse.crew || []);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleAddEvent = () => {
    setShowEventPopup(true);
    setEventDate(selectedDate);
  };

  const handleSaveEventAndSendEmail = async () => {
    if (!eventTitle || selectedAttendees.length === 0) {
      toast.error('Please fill in event title and select at least one attendee');
      return;
    }

    setSendingEmail(true);
    
    try {
      // Get attendee emails
      const allContacts = [...actors, ...crew];
      const attendeeEmails = selectedAttendees
        .map(id => {
          const contact = allContacts.find(c => c.id === id);
          return contact?.email || contact?.Email;
        })
        .filter(Boolean);

      console.log('Selected attendees:', selectedAttendees);
      console.log('Attendee emails:', attendeeEmails);

      if (attendeeEmails.length === 0) {
        toast.error('No valid email addresses found for selected attendees');
        setSendingEmail(false);
        return;
      }

      // Format the event date/time for email
      const eventDateTime = new Date(eventDate);
      eventDateTime.setHours(parseInt(eventTime.split(':')[0]), parseInt(eventTime.split(':')[1]));
      const formattedDate = eventDateTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const formattedTime = eventDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });

      // Create email body
      const emailSubject = `${eventType === 'meeting' ? 'Meeting' : 'Audition'} Invitation: ${eventTitle}`;
      const emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">${eventType === 'meeting' ? '📅 Meeting Invitation' : '🎬 Audition Invitation'}</h2>
          <h3>${eventTitle}</h3>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>📅 Date:</strong> ${formattedDate}</p>
            <p><strong>🕐 Time:</strong> ${formattedTime}</p>
            ${eventLocation ? `<p><strong>📍 Location:</strong> ${eventLocation}</p>` : ''}
            ${eventProject ? `<p><strong>🎬 Project:</strong> ${projects.find(p => p.id === eventProject)?.name || eventProject}</p>` : ''}
          </div>
          
          ${eventDescription ? `
            <div style="margin: 20px 0;">
              <h4>Details:</h4>
              <p>${eventDescription}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">This invitation was sent from FilmLot360 CRM</p>
          </div>
        </div>
      `;

      console.log('Sending emails to:', attendeeEmails);

      // Send emails to all attendees
      let successCount = 0;
      for (const email of attendeeEmails) {
        try {
          const result = await emailAPI.send({
            to: email,
            subject: emailSubject,
            body: emailBody,
            vendor: 'resend'
          });
          console.log(`Email sent to ${email}:`, result);
          successCount++;
        } catch (emailError: any) {
          console.error(`Failed to send email to ${email}:`, emailError);
          toast.error(`Failed to send invitation to ${email}`);
        }
      }

      if (successCount > 0) {
        toast.success(`Event created and invitations sent to ${successCount} attendee(s)!`);
      }
      
      // Reset form
      setShowEventPopup(false);
      setEventTitle('');
      setEventDescription('');
      setEventLocation('');
      setEventProject('');
      setSelectedAttendees([]);
      setEventType('meeting');
      setEventTime('09:00');
      
    } catch (error: any) {
      console.error('Error sending event invitations:', error);
      toast.error('Failed to send invitations: ' + (error.message || 'Unknown error'));
    } finally {
      setSendingEmail(false);
    }
  };

  const handleCancelEvent = () => {
    setShowEventPopup(false);
    setEventTitle('');
    setEventDescription('');
    setEventLocation('');
    setEventProject('');
    setSelectedAttendees([]);
    setEventType('meeting');
    setEventTime('09:00');
  };

  const toggleAttendee = (attendeeId: string) => {
    setSelectedAttendees(prev =>
      prev.includes(attendeeId)
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const handleAddFromDropdown = (personId: string) => {
    if (personId && !selectedAttendees.includes(personId)) {
      setSelectedAttendees(prev => [...prev, personId]);
      toast.success('Attendee added');
    }
  };

  const getAttendeeEmails = () => {
    const allContacts = [...actors, ...crew];
    return selectedAttendees
      .map(id => {
        const contact = allContacts.find(c => c.id === id);
        return contact?.email || contact?.Email;
      })
      .filter(Boolean)
      .join(', ');
  };

  const handleQuickAddContact = async () => {
    if (!quickAddName || !quickAddEmail) {
      toast.error('Please fill in name and email');
      return;
    }

    setSavingContact(true);
    
    try {
      const contactData = {
        name: quickAddName,
        email: quickAddEmail,
        phone: quickAddPhone,
        role: quickAddRole
      };

      console.log('Creating contact with data:', contactData);
      console.log('Contact type:', quickAddType);

      const response = await (quickAddType === 'actor' ? actorsAPI.create(contactData) : crewAPI.create(contactData));
      
      console.log('Create API Response:', response);
      
      if (response.error) {
        throw new Error(response.error.message);
      }

      // Reload contacts first, then close form
      console.log('Reloading contacts...');
      await loadContacts();
      console.log('Contacts reloaded. Current actors:', actors);
      console.log('Contacts reloaded. Current crew:', crew);
      
      toast.success(`Contact added successfully!`);
      
      // Reset form after contacts are loaded
      setShowQuickAdd(false);
      setQuickAddName('');
      setQuickAddEmail('');
      setQuickAddPhone('');
      setQuickAddRole('');
      
    } catch (error: any) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact: ' + (error.message || 'Unknown error'));
    } finally {
      setSavingContact(false);
    }
  };

  const handleCancelQuickAdd = () => {
    setShowQuickAdd(false);
    setQuickAddName('');
    setQuickAddEmail('');
    setQuickAddPhone('');
    setQuickAddRole('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-3xl mb-2">Calendar & Scheduling</h1>
          <p className="text-gray-400">Manage production meetings and casting appointments</p>
        </div>

        {/* Connect Google Calendar Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            onClick={isGoogleCalendarConnected ? handleDisconnectGoogleCalendar : handleConnectGoogleCalendar}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {isConnecting ? 'Connecting...' : isGoogleCalendarConnected ? 'Disconnect Google Calendar' : 'Connect Google Calendar'}
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900 border-white/10 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg">Calendar</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView('day')}
                    className={view === 'day' ? 'bg-white/10 text-white' : 'text-gray-400'}
                  >
                    Day
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView('week')}
                    className={view === 'week' ? 'bg-white/10 text-white' : 'text-gray-400'}
                  >
                    Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView('month')}
                    className={view === 'month' ? 'bg-white/10 text-white' : 'text-gray-400'}
                  >
                    Month
                  </Button>
                </div>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <h3 className="text-white">{monthNames[month]} {year}</h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Calendar Grid */}
              {view === 'month' && (
                <div className="grid grid-cols-7 gap-2">
                  {/* Day Headers */}
                  {dayNames.map((day) => (
                    <div key={day} className="text-center text-gray-500 text-sm py-2">
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {calendarDays.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (item.isCurrentMonth) {
                          const clickedDate = new Date(year, month, item.day);
                          setSelectedDate(clickedDate);
                          setEventDate(clickedDate);
                          setShowEventPopup(true);
                        }
                      }}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm transition-colors
                        ${!item.isCurrentMonth ? 'text-gray-600' : 'text-gray-300'}
                        ${isToday(item.day) && item.isCurrentMonth ? 'bg-purple-600 text-white font-semibold' : ''}
                        ${isSelected(item.day) && item.isCurrentMonth && !isToday(item.day) ? 'bg-white/10 text-white' : ''}
                        ${item.isCurrentMonth && !isToday(item.day) && !isSelected(item.day) ? 'hover:bg-white/5' : ''}
                      `}
                    >
                      {item.day}
                    </button>
                  ))}
                </div>
              )}

              {/* Week View */}
              {view === 'week' && (
                <div>
                  {/* Week Header */}
                  <div className="grid grid-cols-8 gap-2 mb-2">
                    <div className="text-gray-500 text-sm"></div>
                    {Array.from({ length: 7 }).map((_, i) => {
                      const date = new Date(selectedDate);
                      date.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
                      const isCurrentDay = date.toDateString() === new Date().toDateString();
                      return (
                        <div key={i} className="text-center">
                          <div className="text-gray-500 text-sm">{dayNames[i]}</div>
                          <div className={`text-sm mt-1 ${isCurrentDay ? 'bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : 'text-gray-300'}`}>
                            {date.getDate()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Time Slots */}
                  <div className="max-h-96 overflow-y-auto">
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <div key={hour} className="grid grid-cols-8 gap-2 border-t border-white/5">
                        <div className="text-gray-500 text-xs py-2 pr-2 text-right">
                          {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                        </div>
                        {Array.from({ length: 7 }).map((_, day) => (
                          <div
                            key={day}
                            className="py-2 hover:bg-white/5 cursor-pointer rounded transition-colors min-h-[40px]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day View */}
              {view === 'day' && (
                <div>
                  {/* Day Header */}
                  <div className="mb-4 text-center">
                    <div className="text-gray-400 text-sm">{formatSelectedDate()}</div>
                  </div>
                  {/* Time Slots */}
                  <div className="max-h-96 overflow-y-auto">
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <div key={hour} className="flex gap-4 border-t border-white/5 hover:bg-white/5 transition-colors">
                        <div className="text-gray-500 text-sm py-3 w-20 text-right">
                          {hour === 0 ? '12:00 AM' : hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`}
                        </div>
                        <div className="flex-1 py-3 cursor-pointer rounded min-h-[50px]">
                          {/* Event slots would go here */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Meetings for Selected Date */}
            <Card className="bg-zinc-900 border-white/10 p-6 mt-6">
              <h3 className="text-white mb-4">
                Meetings for {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </h3>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                  <CalendarIcon className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500">No meetings scheduled for this date</p>
              </div>
            </Card>
          </div>

          {/* Right Side - Today's Schedule */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900 border-white/10 p-6">
              <h3 className="text-white mb-2">Today's Schedule</h3>
              <p className="text-gray-400 text-sm mb-6">{formatSelectedDate()}</p>

              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                  <CalendarIcon className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-500 text-center">No meetings scheduled for today</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Creation Popup */}
      {showEventPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {eventType === 'meeting' ? (
                  <Users className="w-6 h-6 text-purple-400" />
                ) : (
                  <Video className="w-6 h-6 text-pink-400" />
                )}
                <h3 className="text-white text-xl">Create {eventType === 'meeting' ? 'Meeting' : 'Audition'}</h3>
              </div>
              <button
                onClick={handleCancelEvent}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Event Type */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Event Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setEventType('meeting')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      eventType === 'meeting'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-zinc-600'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Meeting
                  </button>
                  <button
                    onClick={() => setEventType('audition')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      eventType === 'audition'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                        : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-zinc-600'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Audition
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDate.toISOString().split('T')[0]}
                    onChange={(e) => setEventDate(new Date(e.target.value))}
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Title *</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Enter event title..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Description</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Add event details..."
                  rows={3}
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600 resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Enter location or virtual meeting link..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>

              {/* Project */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Project</label>
                <select
                  value={eventProject}
                  onChange={(e) => setEventProject(e.target.value)}
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select a project (optional)</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Attendees */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-gray-400 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Attendees * ({selectedAttendees.length} selected)
                  </label>
                  
                  {/* Quick Add Buttons */}
                  <div className="flex gap-2">
                    {/* Actor Dropdown */}
                    <select
                      onChange={(e) => {
                        if (e.target.value === '__quick_add__') {
                          setQuickAddType('actor');
                          setShowQuickAdd(true);
                          e.target.value = ''; // Reset dropdown
                        } else if (e.target.value) {
                          handleAddFromDropdown(e.target.value);
                          e.target.value = ''; // Reset dropdown
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors text-xs cursor-pointer"
                    >
                      <option value="">+ Add Actor</option>
                      {actors.filter(actor => !selectedAttendees.includes(actor.id)).map((actor) => (
                        <option key={actor.id} value={actor.id}>
                          {actor.name}
                        </option>
                      ))}
                      <option value="__quick_add__" className="border-t border-purple-500/30">
                        ➕ Create New Actor...
                      </option>
                    </select>
                    
                    {/* Crew Dropdown */}
                    <select
                      onChange={(e) => {
                        if (e.target.value === '__quick_add__') {
                          setQuickAddType('crew');
                          setShowQuickAdd(true);
                          e.target.value = ''; // Reset dropdown
                        } else if (e.target.value) {
                          handleAddFromDropdown(e.target.value);
                          e.target.value = ''; // Reset dropdown
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 hover:bg-pink-500/30 transition-colors text-xs cursor-pointer"
                    >
                      <option value="">+ Add Crew</option>
                      {crew.filter(member => !selectedAttendees.includes(member.id)).map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                      <option value="__quick_add__" className="border-t border-pink-500/30">
                        ➕ Create New Crew...
                      </option>
                    </select>
                  </div>
                </div>
                
                {/* Selected Attendees Pills */}
                {selectedAttendees.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    {selectedAttendees.map(attendeeId => {
                      const allContacts = [...actors, ...crew];
                      const contact = allContacts.find(c => c.id === attendeeId);
                      if (!contact) return null;
                      return (
                        <div
                          key={attendeeId}
                          className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-3 py-1"
                        >
                          <span className="text-purple-300 text-sm">{contact.name}</span>
                          <button
                            onClick={() => toggleAttendee(attendeeId)}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Attendees List with Checkboxes */}
                <div className="bg-zinc-800 border border-zinc-700 rounded-lg max-h-64 overflow-y-auto">
                  {loadingContacts ? (
                    <div className="p-4 text-center text-gray-500">Loading contacts...</div>
                  ) : (
                    <>
                      {/* Actors Section */}
                      {actors.length > 0 && (
                        <div>
                          <div className="px-3 py-2 bg-zinc-800/50 border-b border-zinc-700 sticky top-0">
                            <span className="text-purple-400 text-sm">Actors</span>
                          </div>
                          {actors.map((actor) => {
                            const email = actor.email || actor.Email;
                            return (
                              <button
                                key={actor.id}
                                onClick={() => toggleAttendee(actor.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedAttendees.includes(actor.id)
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedAttendees.includes(actor.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{actor.name}</div>
                                  {email && (
                                    <div className="text-gray-500 text-xs flex items-center gap-1">
                                      <MailIcon className="w-3 h-3" />
                                      {email}
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Crew Section */}
                      {crew.length > 0 && (
                        <div>
                          <div className="px-3 py-2 bg-zinc-800/50 border-b border-zinc-700 sticky top-0">
                            <span className="text-pink-400 text-sm">Crew</span>
                          </div>
                          {crew.map((member) => {
                            const email = member.email || member.Email;
                            return (
                              <button
                                key={member.id}
                                onClick={() => toggleAttendee(member.id)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors border-b border-zinc-800 last:border-0"
                              >
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                  selectedAttendees.includes(member.id)
                                    ? 'bg-pink-500 border-pink-500'
                                    : 'border-zinc-600'
                                }`}>
                                  {selectedAttendees.includes(member.id) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-gray-300 text-sm">{member.name}</div>
                                  {email && (
                                    <div className="text-gray-500 text-xs flex items-center gap-1">
                                      <MailIcon className="w-3 h-3" />
                                      {email}
                                    </div>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {actors.length === 0 && crew.length === 0 && (
                        <div className="p-6 text-center">
                          <div className="mb-4">
                            <div className="w-16 h-16 bg-zinc-800/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                              <Users className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 mb-1">No contacts available</p>
                            <p className="text-gray-500 text-sm mb-4">Add contacts to invite them to events</p>
                          </div>
                          <div className="w-full max-w-xs mx-auto">
                            <label className="text-gray-400 text-sm mb-2 block">Quick Add Contact</label>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setQuickAddType('actor');
                                  setShowQuickAdd(true);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                              >
                                <Users className="w-4 h-4" />
                                Add Actor
                              </button>
                              <button
                                onClick={() => {
                                  setQuickAddType('crew');
                                  setShowQuickAdd(true);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 hover:bg-pink-500/30 transition-colors"
                              >
                                <Users className="w-4 h-4" />
                                Add Crew
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Email Preview */}
              {selectedAttendees.length > 0 && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MailIcon className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm">Email Invitations Will Be Sent To:</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {getAttendeeEmails() || 'No valid email addresses found'}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-800">
              <Button
                variant="outline"
                className="flex-1 border-zinc-700 text-gray-400 hover:bg-zinc-800"
                onClick={handleCancelEvent}
                disabled={sendingEmail}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                onClick={handleSaveEventAndSendEmail}
                disabled={sendingEmail || !eventTitle || selectedAttendees.length === 0}
              >
                {sendingEmail ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MailIcon className="w-4 h-4 mr-2" />
                    Create & Send Invitations
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Quick Add Contact Popup */}
      {showQuickAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-zinc-900 border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {quickAddType === 'actor' ? (
                  <Users className="w-6 h-6 text-purple-400" />
                ) : (
                  <Video className="w-6 h-6 text-pink-400" />
                )}
                <h3 className="text-white text-xl">Quick Add {quickAddType === 'actor' ? 'Actor' : 'Crew'}</h3>
              </div>
              <button
                onClick={handleCancelQuickAdd}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Contact Type */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Contact Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setQuickAddType('actor')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      quickAddType === 'actor'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-zinc-600'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Actor
                  </button>
                  <button
                    onClick={() => setQuickAddType('crew')}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      quickAddType === 'crew'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                        : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-zinc-600'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    Crew
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Name *</label>
                <input
                  type="text"
                  value={quickAddName}
                  onChange={(e) => setQuickAddName(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Email *</label>
                <input
                  type="email"
                  value={quickAddEmail}
                  onChange={(e) => setQuickAddEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Phone</label>
                <input
                  type="tel"
                  value={quickAddPhone}
                  onChange={(e) => setQuickAddPhone(e.target.value)}
                  placeholder="Enter phone number..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Role</label>
                <input
                  type="text"
                  value={quickAddRole}
                  onChange={(e) => setQuickAddRole(e.target.value)}
                  placeholder="Enter role..."
                  className="w-full bg-zinc-800 text-gray-300 border border-zinc-700 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 placeholder-gray-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-zinc-800">
              <Button
                variant="outline"
                className="flex-1 border-zinc-700 text-gray-400 hover:bg-zinc-800"
                onClick={handleCancelQuickAdd}
                disabled={savingContact}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                onClick={handleQuickAddContact}
                disabled={savingContact || !quickAddName || !quickAddEmail}
              >
                {savingContact ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <MailIcon className="w-4 h-4 mr-2" />
                    Add Contact
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}