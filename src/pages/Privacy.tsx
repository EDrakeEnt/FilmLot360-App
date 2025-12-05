import { PageLayout } from "../components/PageLayout";
import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react";

export function Privacy() {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
    >
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Last Updated */}
        <div className="mb-12 text-center">
          <p className="text-gray-400">Last Updated: December 2, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white mb-4">Introduction</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                FilmLot360 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our film production management CRM platform.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By accessing or using FilmLot360, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Information We Collect</h2>
          </div>
          
          <div className="space-y-6 ml-16">
            <div>
              <h3 className="text-xl text-white mb-3">Personal Information</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Account credentials (username and password)</li>
                <li>Billing and payment information</li>
                <li>Profile information and preferences</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white mb-3">Production Data</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                When you use our platform, we collect information about your film production projects:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Project details, schedules, and budgets</li>
                <li>Cast and crew information</li>
                <li>Production documents and files</li>
                <li>Call sheets and shooting schedules</li>
                <li>Budget tracking and invoicing data</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white mb-3">Usage Information</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                We automatically collect certain information about your device and how you interact with our services:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Device information (type, operating system, browser)</li>
                <li>IP address and location data</li>
                <li>Usage patterns and feature interactions</li>
                <li>Log files and analytics data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">How We Use Your Information</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Personalize and improve your experience</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Information Sharing and Disclosure</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-3 ml-4">
              <li><strong className="text-white">With Your Consent:</strong> We share information when you explicitly authorize us to do so</li>
              <li><strong className="text-white">Service Providers:</strong> We share with third-party vendors who perform services on our behalf (payment processing, hosting, analytics)</li>
              <li><strong className="text-white">Team Members:</strong> Information is shared with other users you collaborate with on production projects</li>
              <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong className="text-white">Aggregated Data:</strong> We may share anonymized, aggregated data that cannot identify you</li>
            </ul>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Data Security</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Industry-standard encryption for data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection practices</li>
              <li>Secure data centers and infrastructure</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Your Rights and Choices</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-3 ml-4">
              <li><strong className="text-white">Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your personal information</li>
              <li><strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from marketing communications</li>
              <li><strong className="text-white">Cookies:</strong> Manage cookie preferences through your browser settings</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@filmlot360.com.
            </p>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Data Retention</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We will retain and use your information to the extent necessary to:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
            <li>Maintain business records</li>
          </ul>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Children's Privacy</h2>
          <p className="text-gray-400 leading-relaxed">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately.
          </p>
        </div>

        {/* International Data Transfers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">International Data Transfers</h2>
          <p className="text-gray-400 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate safeguards to ensure your information remains protected in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Changes to Privacy Policy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="text-gray-300 space-y-2">
            <p><strong>Email:</strong> privacy@filmlot360.com</p>
            <p><strong>Address:</strong> FilmLot360, Inc., Tampa, FL 33612</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
