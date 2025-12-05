import { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { Building2, User, Mail, Phone, Globe, Briefcase, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function PartnersApplication() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    companyWebsite: "",
    companySize: "",
    companyLocation: "",
    companyIndustry: "",
    
    // Contact Information
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    
    // Partnership Details
    partnershipType: "",
    referralVolume: "",
    experience: "",
    productsServices: "",
    targetMarket: "",
    
    // Additional Information
    reasonForPartnership: "",
    additionalComments: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.companyName || !formData.contactName || !formData.contactEmail || !formData.partnershipType) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // In a real application, this would send data to the backend
    console.log("Partner Application Submitted:", formData);
    
    toast.success("Application submitted successfully!");
    setSubmitted(true);
    
    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <PageLayout 
        title="Application Submitted" 
        subtitle="Thank you for your interest in partnering with FilmLot360"
      >
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl text-white mb-4">Application Received!</h3>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for applying to become a FilmLot360 partner. Our partnerships team will review your application and get back to you within 3-5 business days.
              </p>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
                <h4 className="text-lg text-white mb-3">What happens next?</h4>
                <ul className="text-left text-gray-300 space-y-3 max-w-xl mx-auto">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Our team will review your application and company information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>We'll schedule a call to discuss partnership opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Upon approval, you'll receive onboarding materials and resources</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-400 mb-8">
                A confirmation email has been sent to <span className="text-purple-400">{formData.contactEmail}</span>
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/partners"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Back to Partners
                </a>
                <a
                  href="/"
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Return Home
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Partner Program Application" 
      subtitle="Join the FilmLot360 partner ecosystem"
    >
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              Thank you for your interest in partnering with FilmLot360. Please complete this application to help us understand your business and partnership goals. All fields marked with an asterisk (*) are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white">Company Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm text-gray-400 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Acme Productions"
                  />
                </div>
                
                <div>
                  <label htmlFor="companyWebsite" className="block text-sm text-gray-400 mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="companyWebsite"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://www.example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="companySize" className="block text-sm text-gray-400 mb-2">
                    Company Size *
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="companyLocation" className="block text-sm text-gray-400 mb-2">
                    Company Location *
                  </label>
                  <input
                    type="text"
                    id="companyLocation"
                    name="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Los Angeles, CA"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="companyIndustry" className="block text-sm text-gray-400 mb-2">
                    Industry/Sector
                  </label>
                  <input
                    type="text"
                    id="companyIndustry"
                    name="companyIndustry"
                    value={formData.companyIndustry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Film Production, Post-Production, Software, etc."
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white">Primary Contact Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactTitle" className="block text-sm text-gray-400 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="contactTitle"
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Business Development Manager"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white">Partnership Details</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="partnershipType" className="block text-sm text-gray-400 mb-2">
                    Partnership Type *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select partnership type</option>
                    <option value="technology">Technology Partner - Integrate your product</option>
                    <option value="reseller">Reseller Partner - Sell FilmLot360</option>
                    <option value="agency">Agency Partner - Refer clients</option>
                    <option value="affiliate">Affiliate Partner - Marketing partnership</option>
                    <option value="other">Other - Please explain in comments</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="referralVolume" className="block text-sm text-gray-400 mb-2">
                    Expected Monthly Referral/Sales Volume
                  </label>
                  <select
                    id="referralVolume"
                    name="referralVolume"
                    value={formData.referralVolume}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select expected volume</option>
                    <option value="1-5">1-5 customers/month</option>
                    <option value="6-10">6-10 customers/month</option>
                    <option value="11-25">11-25 customers/month</option>
                    <option value="26-50">26-50 customers/month</option>
                    <option value="51+">51+ customers/month</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm text-gray-400 mb-2">
                    Experience in Film/Entertainment Industry
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11+">11+ years</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="productsServices" className="block text-sm text-gray-400 mb-2">
                    Your Products/Services
                  </label>
                  <textarea
                    id="productsServices"
                    name="productsServices"
                    value={formData.productsServices}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Briefly describe the products or services your company offers..."
                  />
                </div>
                
                <div>
                  <label htmlFor="targetMarket" className="block text-sm text-gray-400 mb-2">
                    Target Market/Customers
                  </label>
                  <textarea
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Describe your target market and typical customers..."
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl text-white">Additional Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="reasonForPartnership" className="block text-sm text-gray-400 mb-2">
                    Why do you want to partner with FilmLot360? *
                  </label>
                  <textarea
                    id="reasonForPartnership"
                    name="reasonForPartnership"
                    value={formData.reasonForPartnership}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tell us about your goals and how a partnership with FilmLot360 aligns with your business objectives..."
                  />
                </div>
                
                <div>
                  <label htmlFor="additionalComments" className="block text-sm text-gray-400 mb-2">
                    Additional Comments or Questions
                  </label>
                  <textarea
                    id="additionalComments"
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-8 text-center">
              <p className="text-gray-300 mb-6">
                By submitting this application, you agree to our <a href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>.
              </p>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </PageLayout>
  );
}
