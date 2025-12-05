import { useState } from 'react';
import { X, CheckCircle, Circle, Clock, AlertCircle, FileText, Download, Upload, DollarSign, User, Mail, Phone, MapPin, Calendar, Send, Paperclip } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface ProductionPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export function ProductionPipelineModal({ isOpen, onClose, project }: ProductionPipelineModalProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'workflow', label: 'Workflow Steps' },
    { id: 'approvals', label: 'Approvals' },
    { id: 'documents', label: 'Documents' },
    { id: 'invoice', label: 'Invoice Line Items' },
    { id: 'vendor', label: 'Vendor Information' },
    { id: 'payment', label: 'Payment Information' },
    { id: 'communications', label: 'Communications' },
  ];

  const workflowSteps = [
    {
      id: 1,
      name: 'Pre-Production',
      status: 'completed',
      dueDate: '2024-01-15',
      assignee: 'Sarah Johnson',
      tasks: [
        { name: 'Script Finalization', status: 'completed' },
        { name: 'Location Scouting', status: 'completed' },
        { name: 'Casting', status: 'completed' },
      ],
    },
    {
      id: 2,
      name: 'Production Setup',
      status: 'in-progress',
      dueDate: '2024-02-01',
      assignee: 'Michael Chen',
      tasks: [
        { name: 'Equipment Rental', status: 'completed' },
        { name: 'Crew Assignment', status: 'in-progress' },
        { name: 'Schedule Creation', status: 'pending' },
      ],
    },
    {
      id: 3,
      name: 'Principal Photography',
      status: 'pending',
      dueDate: '2024-03-15',
      assignee: 'Emma Rodriguez',
      tasks: [
        { name: 'Day 1-5 Shooting', status: 'pending' },
        { name: 'Day 6-10 Shooting', status: 'pending' },
        { name: 'Day 11-15 Shooting', status: 'pending' },
      ],
    },
    {
      id: 4,
      name: 'Post-Production',
      status: 'pending',
      dueDate: '2024-05-01',
      assignee: 'David Park',
      tasks: [
        { name: 'Video Editing', status: 'pending' },
        { name: 'Sound Design', status: 'pending' },
        { name: 'Color Grading', status: 'pending' },
      ],
    },
  ];

  const approvals = [
    {
      id: 1,
      type: 'Budget Approval',
      requestedBy: 'Sarah Johnson',
      requestedDate: '2024-01-10',
      amount: '$25,000,000',
      status: 'approved',
      approvedBy: 'John Smith',
      approvalDate: '2024-01-12',
    },
    {
      id: 2,
      type: 'Location Contract',
      requestedBy: 'Michael Chen',
      requestedDate: '2024-01-15',
      amount: '$150,000',
      status: 'approved',
      approvedBy: 'Jane Doe',
      approvalDate: '2024-01-16',
    },
    {
      id: 3,
      type: 'Equipment Rental',
      requestedBy: 'Emma Rodriguez',
      requestedDate: '2024-01-20',
      amount: '$75,000',
      status: 'pending',
      approvedBy: null,
      approvalDate: null,
    },
  ];

  const documents = [
    {
      id: 1,
      name: 'Final Script - Killer Queen.pdf',
      type: 'Script',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: '2024-01-05',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'Production Budget Breakdown.xlsx',
      type: 'Budget',
      uploadedBy: 'Michael Chen',
      uploadedDate: '2024-01-08',
      size: '856 KB',
    },
    {
      id: 3,
      name: 'Location Contract - Downtown.pdf',
      type: 'Contract',
      uploadedBy: 'Emma Rodriguez',
      uploadedDate: '2024-01-12',
      size: '1.2 MB',
    },
    {
      id: 4,
      name: 'Cast List - Approved.pdf',
      type: 'Casting',
      uploadedBy: 'David Park',
      uploadedDate: '2024-01-15',
      size: '345 KB',
    },
  ];

  const invoiceLineItems = [
    {
      id: 1,
      description: 'Camera Equipment Rental - ARRI Alexa',
      quantity: 15,
      unit: 'days',
      unitPrice: 2500,
      total: 37500,
      category: 'Equipment',
    },
    {
      id: 2,
      description: 'Location Fee - Downtown Warehouse',
      quantity: 10,
      unit: 'days',
      unitPrice: 5000,
      total: 50000,
      category: 'Locations',
    },
    {
      id: 3,
      description: 'Catering Services',
      quantity: 30,
      unit: 'days',
      unitPrice: 1200,
      total: 36000,
      category: 'Services',
    },
    {
      id: 4,
      description: 'Post-Production Suite',
      quantity: 60,
      unit: 'days',
      unitPrice: 800,
      total: 48000,
      category: 'Post-Production',
    },
  ];

  const vendors = [
    {
      id: 1,
      name: 'Hollywood Camera Rentals',
      category: 'Equipment',
      contact: 'James Wilson',
      email: 'james@hollywoodcamera.com',
      phone: '+1 (323) 555-0123',
      address: '1234 Studio Blvd, Los Angeles, CA 90028',
      totalContracts: '$87,500',
    },
    {
      id: 2,
      name: 'Prime Locations Inc.',
      category: 'Locations',
      contact: 'Maria Garcia',
      email: 'maria@primelocations.com',
      phone: '+1 (323) 555-0456',
      address: '5678 Sunset Ave, Los Angeles, CA 90028',
      totalContracts: '$150,000',
    },
    {
      id: 3,
      name: 'Gourmet Film Catering',
      category: 'Services',
      contact: 'Robert Lee',
      email: 'robert@gourmetfilm.com',
      phone: '+1 (323) 555-0789',
      address: '9012 Hollywood Dr, Los Angeles, CA 90028',
      totalContracts: '$36,000',
    },
  ];

  const payments = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      vendor: 'Hollywood Camera Rentals',
      amount: '$37,500',
      dueDate: '2024-02-15',
      status: 'paid',
      paidDate: '2024-02-10',
      paymentMethod: 'Wire Transfer',
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      vendor: 'Prime Locations Inc.',
      amount: '$50,000',
      dueDate: '2024-02-20',
      status: 'pending',
      paidDate: null,
      paymentMethod: 'Check',
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      vendor: 'Gourmet Film Catering',
      amount: '$18,000',
      dueDate: '2024-03-01',
      status: 'overdue',
      paidDate: null,
      paymentMethod: 'Wire Transfer',
    },
  ];

  const communications = [
    {
      id: 1,
      from: 'Sarah Johnson',
      to: 'Production Team',
      subject: 'Pre-Production Meeting - Schedule Update',
      date: '2024-01-20 10:30 AM',
      preview: 'Hi team, please note the pre-production meeting has been moved to Thursday at 2 PM...',
      hasAttachment: true,
    },
    {
      id: 2,
      from: 'Michael Chen',
      to: 'Sarah Johnson',
      subject: 'Location Contract - Signature Required',
      date: '2024-01-19 3:45 PM',
      preview: 'The downtown location contract is ready for your signature. Please review and...',
      hasAttachment: true,
    },
    {
      id: 3,
      from: 'Emma Rodriguez',
      to: 'Casting Department',
      subject: 'Final Cast List Approved',
      date: '2024-01-18 11:15 AM',
      preview: 'Great news! The final cast list has been approved by the director. Attached is...',
      hasAttachment: true,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
      case 'paid':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'in-progress':
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl mb-1">Production Pipeline</h2>
            <p className="text-gray-400">{project?.title || 'Project Details'}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-white/10 overflow-x-auto">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="text-gray-400 text-sm mb-2">Production Status</div>
                  <div className="text-white text-xl">{project?.status || 'Pre-Production'}</div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="text-gray-400 text-sm mb-2">Total Budget</div>
                  <div className="text-white text-xl">{project?.budget || '$25M'}</div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="text-gray-400 text-sm mb-2">Director</div>
                  <div className="text-white text-xl">{project?.director || 'Kapplan'}</div>
                </Card>
                <Card className="bg-zinc-800 border-white/10 p-4">
                  <div className="text-gray-400 text-sm mb-2">Start Date</div>
                  <div className="text-white text-xl">{project?.startDate || '2024-03-15'}</div>
                </Card>
              </div>

              <Card className="bg-zinc-800 border-white/10 p-6">
                <h3 className="text-white mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Production Company</div>
                    <div className="text-white">{project?.productionCompany || 'TB Punk Films'}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Genre</div>
                    <div className="text-white">{project?.genre || 'Drama'}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Cast Members</div>
                    <div className="text-white">{project?.castCount || 0} actors</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Crew Members</div>
                    <div className="text-white">{project?.crewCount || 0} crew</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-zinc-800 border-white/10 p-6">
                <h3 className="text-white mb-4">Pipeline Progress</h3>
                <div className="space-y-3">
                  {workflowSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      {getStatusIcon(step.status)}
                      <div className="flex-1">
                        <div className="text-white">{step.name}</div>
                        <div className="text-gray-400 text-sm">Assigned to: {step.assignee}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(step.status)}`}>
                        {step.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Workflow Steps Tab */}
          {activeTab === 'workflow' && (
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <Card key={step.id} className="bg-zinc-800 border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-white text-lg mb-1">{step.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{step.assignee}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {step.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(step.status)}`}>
                      {step.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm mb-2">Tasks:</div>
                    {step.tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-2 pl-4">
                        {getStatusIcon(task.status)}
                        <span className="text-gray-300 text-sm">{task.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Approvals Tab */}
          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {approvals.map((approval) => (
                <Card key={approval.id} className="bg-zinc-800 border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white text-lg mb-1">{approval.type}</h3>
                      <div className="text-gray-400 text-sm">
                        Requested by {approval.requestedBy} on {approval.requestedDate}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(approval.status)}`}>
                      {approval.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Amount</div>
                      <div className="text-white">{approval.amount}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Approved By</div>
                      <div className="text-white">{approval.approvedBy || 'Pending'}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Approval Date</div>
                      <div className="text-white">{approval.approvalDate || 'N/A'}</div>
                    </div>
                  </div>

                  {approval.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Approve
                      </Button>
                      <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                        Reject
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Project Documents</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <Card key={doc.id} className="bg-zinc-800 border-white/10 p-4 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-white mb-1">{doc.name}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.uploadedBy}</span>
                            <span>•</span>
                            <span>{doc.uploadedDate}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Invoice Line Items Tab */}
          {activeTab === 'invoice' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white mb-1">Invoice Line Items</h3>
                  <p className="text-gray-400 text-sm">Detailed breakdown of project costs</p>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Total Amount</div>
                  <div className="text-white text-2xl">
                    ${invoiceLineItems.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <Card className="bg-zinc-800 border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-900">
                      <tr>
                        <th className="text-left text-gray-400 text-sm p-4">Description</th>
                        <th className="text-left text-gray-400 text-sm p-4">Category</th>
                        <th className="text-right text-gray-400 text-sm p-4">Quantity</th>
                        <th className="text-right text-gray-400 text-sm p-4">Unit Price</th>
                        <th className="text-right text-gray-400 text-sm p-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceLineItems.map((item) => (
                        <tr key={item.id} className="border-t border-white/10">
                          <td className="text-white p-4">{item.description}</td>
                          <td className="text-gray-400 p-4">
                            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs">
                              {item.category}
                            </span>
                          </td>
                          <td className="text-gray-300 p-4 text-right">{item.quantity} {item.unit}</td>
                          <td className="text-gray-300 p-4 text-right">${item.unitPrice.toLocaleString()}</td>
                          <td className="text-white p-4 text-right font-semibold">${item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Vendor Information Tab */}
          {activeTab === 'vendor' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Vendor Directory</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Add Vendor
                </Button>
              </div>
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <Card key={vendor.id} className="bg-zinc-800 border-white/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-white text-lg mb-1">{vendor.name}</h4>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
                          {vendor.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">Total Contracts</div>
                        <div className="text-white text-xl">{vendor.totalContracts}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{vendor.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{vendor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{vendor.address}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Payment Information Tab */}
          {activeTab === 'payment' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white mb-1">Payment Tracking</h3>
                  <p className="text-gray-400 text-sm">Monitor all vendor payments and invoices</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </div>

              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id} className="bg-zinc-800 border-white/10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-white text-lg mb-1">{payment.invoiceNumber}</h4>
                        <div className="text-gray-400">{payment.vendor}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Amount</div>
                        <div className="text-white text-lg">{payment.amount}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Due Date</div>
                        <div className="text-white">{payment.dueDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Payment Method</div>
                        <div className="text-white">{payment.paymentMethod}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Paid Date</div>
                        <div className="text-white">{payment.paidDate || 'N/A'}</div>
                      </div>
                    </div>

                    {payment.status === 'pending' && (
                      <Button className="bg-green-600 hover:bg-green-700 text-white mt-4">
                        Mark as Paid
                      </Button>
                    )}
                    {payment.status === 'overdue' && (
                      <div className="flex items-center gap-2 mt-4 text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">Payment is overdue</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Communications Tab */}
          {activeTab === 'communications' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white">Project Communications</h3>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>

              <div className="space-y-3">
                {communications.map((comm) => (
                  <Card key={comm.id} className="bg-zinc-800 border-white/10 p-5 hover:border-purple-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">
                          {comm.from.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="text-white">{comm.from}</h4>
                            <div className="text-gray-400 text-sm">To: {comm.to}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-sm whitespace-nowrap">{comm.date}</span>
                            {comm.hasAttachment && (
                              <Paperclip className="w-4 h-4 text-gray-500" />
                            )}
                          </div>
                        </div>
                        <div className="text-white mb-2">{comm.subject}</div>
                        <p className="text-gray-400 text-sm">{comm.preview}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
