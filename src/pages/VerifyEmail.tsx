import { Link, useNavigate } from "react-router-dom";
import { Mail, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";
import { projectId, publicAnonKey } from "../utils/supabase/info.tsx";

export function VerifyEmail() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check verification status on mount
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
      setError("Session expired. Please sign up again.");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/verify-status/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmail(data.email);
        if (data.emailVerified) {
          setVerified(true);
        }
      }
    } catch (err) {
      console.error("Error checking verification status:", err);
    }
  };

  const handleVerify = async () => {
    setChecking(true);
    setError("");

    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
      setError("Session expired. Please sign up again.");
      setChecking(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0eae7ae/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify email');
      }

      setVerified(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 justify-center">
          <img src={logo} alt="FilmLot360 Logo" className="w-10 h-10 object-contain" />
          <span className="text-white text-2xl">FilmLot360</span>
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          {!verified ? (
            <>
              {/* Email Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>

              {/* Header */}
              <h1 className="text-3xl text-white mb-3">Verify Your Email</h1>
              <p className="text-gray-400 mb-8">
                We've sent a verification email to{" "}
                <span className="text-purple-400">{email || "your email address"}</span>
              </p>

              {/* Instructions */}
              <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-white mb-3">Next Steps:</h3>
                <ol className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 flex-shrink-0">1.</span>
                    <span>Check your inbox for an email from FilmLot360</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 flex-shrink-0">2.</span>
                    <span>Click the verification link in the email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 flex-shrink-0">3.</span>
                    <span>Return here and click "I've Verified My Email"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 flex-shrink-0">4.</span>
                    <span>You'll receive a dashboard access link via email</span>
                  </li>
                </ol>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={checking}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    I've Verified My Email
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Help Text */}
              <p className="text-sm text-gray-500">
                Didn't receive the email?{" "}
                <button className="text-purple-400 hover:text-purple-300">
                  Resend verification email
                </button>
              </p>
            </>
          ) : (
            <>
              {/* Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              {/* Success Message */}
              <h1 className="text-3xl text-white mb-3">Email Verified!</h1>
              <p className="text-gray-400 mb-8">
                Your email has been successfully verified. We've sent you an email with a link to access your dashboard.
              </p>

              {/* Dashboard Access */}
              <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-6 mb-8">
                <p className="text-green-300 text-sm leading-relaxed">
                  Check your email for the dashboard access link, or you'll be automatically redirected in a moment.
                </p>
              </div>

              {/* Manual Redirect */}
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all group"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </>
          )}
        </div>

        {/* Back to Home */}
        {!verified && (
          <p className="text-gray-400 mt-8 text-center">
            Need help?{" "}
            <Link to="/" className="text-purple-400 hover:text-purple-300">
              Return to homepage
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
