import { PageLayout } from "../components/PageLayout";
import { FileText, Ban, Scale, AlertCircle, Shield, Users, CreditCard, XCircle } from "lucide-react";

export function Terms() {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using FilmLot360"
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and FilmLot360, Inc. ("FilmLot360," "we," "us," or "our") concerning your access to and use of our film production management CRM platform and related services (collectively, the "Services").
              </p>
              <p className="text-gray-400 leading-relaxed">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </div>
          </div>
        </div>

        {/* NO REFUND POLICY - HIGHLIGHTED */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/50 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Ban className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-white mb-2">No Refund Policy</h2>
              <p className="text-red-400 uppercase tracking-wide text-sm">IMPORTANT - PLEASE READ CAREFULLY</p>
            </div>
          </div>
          
          <div className="ml-16 space-y-4">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">ALL SALES ARE FINAL.</strong> FilmLot360 operates a strict no refund policy for all subscription plans and services. By subscribing to any of our plans, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3 ml-4">
              <li><strong className="text-white">No Refunds:</strong> We do not offer refunds, credits, or pro-rated charges for any subscription fees, whether monthly or annual</li>
              <li><strong className="text-white">No Exceptions:</strong> This policy applies regardless of usage, cancellation timing, or circumstances</li>
              <li><strong className="text-white">Cancellation:</strong> You may cancel your subscription at any time, but you will not receive a refund for the current billing period</li>
              <li><strong className="text-white">Access Until End of Period:</strong> If you cancel, you will retain access to the Services until the end of your current billing period</li>
              <li><strong className="text-white">No Partial Refunds:</strong> No partial month refunds or credits will be issued for mid-cycle cancellations</li>
            </ul>
            <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-4 mt-6">
              <p className="text-gray-200 leading-relaxed">
                <strong className="text-white">By subscribing, you explicitly acknowledge that you have read, understood, and agree to this no refund policy.</strong> We encourage you to carefully evaluate our service offerings and consider using any available free trial periods before committing to a paid subscription.
              </p>
            </div>
          </div>
        </div>

        {/* Account Registration */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Account Registration and Security</h2>
          </div>
          
          <div className="ml-16 space-y-4">
            <p className="text-gray-400 leading-relaxed">
              To use certain features of the Services, you must register for an account. When you register, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              You may not share your account credentials or allow others to access your account. You are responsible for all activities that occur under your account.
            </p>
          </div>
        </div>

        {/* Subscription and Billing */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Subscription Plans and Billing</h2>
          </div>
          
          <div className="ml-16 space-y-6">
            <div>
              <h3 className="text-xl text-white mb-3">Subscription Terms</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                FilmLot360 offers various subscription plans with different features and pricing. By subscribing to a plan, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Pay the applicable subscription fees for your chosen plan</li>
                <li>Automatic renewal of your subscription at the end of each billing cycle</li>
                <li>Charges to your payment method on file at the start of each billing period</li>
                <li>Price changes with at least 30 days' advance notice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl text-white mb-3">Payment Methods</h3>
              <p className="text-gray-400 leading-relaxed">
                You must provide a valid payment method to purchase a subscription. By providing payment information, you authorize us to charge all fees incurred through your account to your payment method. If automatic billing fails, we may attempt to charge alternative payment methods on file.
              </p>
            </div>

            <div>
              <h3 className="text-xl text-white mb-3">Cancellation</h3>
              <p className="text-gray-400 leading-relaxed">
                You may cancel your subscription at any time through your account settings or by contacting customer support. Cancellation will be effective at the end of your current billing period. Remember, no refunds will be issued for the current or any prior billing periods.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptable Use */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Acceptable Use Policy</h2>
          </div>
          
          <div className="ml-16 space-y-4">
            <p className="text-gray-400 leading-relaxed">
              You agree not to use the Services to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others, including intellectual property rights</li>
              <li>Upload or transmit viruses, malware, or other malicious code</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Engage in any fraudulent, abusive, or illegal activity</li>
              <li>Harvest or collect information about other users without consent</li>
              <li>Use the Services for any unauthorized commercial purposes</li>
              <li>Impersonate any person or entity or misrepresent your affiliation</li>
              <li>Share your account credentials with unauthorized users</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              We reserve the right to investigate and take appropriate legal action against anyone who violates this policy, including removing content and terminating accounts.
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Intellectual Property Rights</h2>
          </div>
          
          <div className="ml-16 space-y-4">
            <div>
              <h3 className="text-xl text-white mb-3">Our Content</h3>
              <p className="text-gray-400 leading-relaxed">
                The Services and all content, features, and functionality (including but not limited to software, text, graphics, logos, and images) are owned by FilmLot360 and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our express written permission.
              </p>
            </div>

            <div>
              <h3 className="text-xl text-white mb-3">Your Content</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                You retain all rights to the content you upload to the Services ("User Content"). By uploading User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, store, reproduce, and display your User Content solely for the purpose of providing and improving the Services.
              </p>
              <p className="text-gray-400 leading-relaxed">
                You represent and warrant that you own or have the necessary rights to upload your User Content and that it does not violate any third-party rights or applicable laws.
              </p>
            </div>
          </div>
        </div>

        {/* Data and Privacy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Data and Privacy</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Your privacy is important to us. Our collection and use of personal information is described in our Privacy Policy, which is incorporated into these Terms by reference. By using the Services, you consent to our collection and use of your information as described in the Privacy Policy.
          </p>
          <p className="text-gray-400 leading-relaxed">
            You are responsible for backing up your data. While we implement reasonable security measures, we are not responsible for any loss or corruption of your data.
          </p>
        </div>

        {/* Disclaimer of Warranties */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Disclaimer of Warranties</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4 uppercase">
              <strong className="text-white">THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              We disclaim all warranties, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Merchantability and fitness for a particular purpose</li>
              <li>Non-infringement of third-party rights</li>
              <li>Uninterrupted, secure, or error-free operation</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Correction of defects or errors</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              We do not guarantee that the Services will meet your requirements or expectations.
            </p>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl text-white">Limitation of Liability</h2>
          </div>
          
          <div className="ml-16">
            <p className="text-gray-400 leading-relaxed mb-4 uppercase">
              <strong className="text-white">TO THE MAXIMUM EXTENT PERMITTED BY LAW, FILMLOT360 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</strong>
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              This includes damages for:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Loss of profits, revenue, or data</li>
              <li>Business interruption</li>
              <li>Loss of goodwill</li>
              <li>Inability to use the Services</li>
              <li>Cost of substitute services</li>
            </ul>
            <p className="text-gray-400 leading-relaxed mt-4">
              Our total liability to you for any claims arising from your use of the Services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
            </p>
          </div>
        </div>

        {/* Indemnification */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Indemnification</h2>
          <p className="text-gray-400 leading-relaxed">
            You agree to indemnify, defend, and hold harmless FilmLot360, its affiliates, and their respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from: (a) your use of the Services; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any rights of another party.
          </p>
        </div>

        {/* Termination */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Termination</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, with or without notice, effective immediately. Reasons for termination may include, but are not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Violation of these Terms or our policies</li>
            <li>Suspected fraudulent or illegal activity</li>
            <li>Extended periods of inactivity</li>
            <li>Failure to pay fees when due</li>
            <li>At our sole discretion for any reason</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            Upon termination, your right to use the Services will immediately cease. We are not obligated to retain or provide you with copies of your User Content after termination.
          </p>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Dispute Resolution and Arbitration</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl text-white mb-3">Governing Law</h3>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-white mb-3">Arbitration Agreement</h3>
              <p className="text-gray-400 leading-relaxed mb-3">
                Any dispute arising from these Terms or your use of the Services shall be resolved through binding arbitration in accordance with the American Arbitration Association's rules, rather than in court. You waive your right to a jury trial and to participate in class actions.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Changes to These Terms</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Posting the updated Terms on our website</li>
            <li>Updating the "Last Updated" date</li>
            <li>Sending you an email notification (for material changes)</li>
          </ul>
          <p className="text-gray-400 leading-relaxed mt-4">
            Your continued use of the Services after changes become effective constitutes acceptance of the modified Terms.
          </p>
        </div>

        {/* Miscellaneous */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl text-white mb-4">Miscellaneous</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl text-white mb-2">Entire Agreement</h3>
              <p className="text-gray-400 leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and FilmLot360 regarding the Services.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Severability</h3>
              <p className="text-gray-400 leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Waiver</h3>
              <p className="text-gray-400 leading-relaxed">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-white mb-2">Assignment</h3>
              <p className="text-gray-400 leading-relaxed">
                You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="text-gray-300 space-y-2">
            <p><strong>Email:</strong> legal@filmlot360.com</p>
            <p><strong>Address:</strong> FilmLot360, Inc., Tampa, FL 33612</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
