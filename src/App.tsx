import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { VerifyEmail } from './pages/VerifyEmail';
import { Subscription } from './pages/Subscription';
import { Checkout } from './pages/Checkout';
import { Dashboard } from './pages/Dashboard';
import { DashboardProfile } from './pages/DashboardProfile';
import { DashboardSettings } from './pages/DashboardSettings';
import { DashboardSubscription } from './pages/DashboardSubscription';
import { DashboardAccount } from './pages/DashboardAccount';
import { DashboardCalendar } from './pages/DashboardCalendar';
import { DashboardProjects } from './pages/DashboardProjects';
import { DashboardInvoices } from './pages/DashboardInvoices';
import { DashboardEmails } from './pages/DashboardEmails';
import { DashboardPaymentMethods } from './pages/DashboardPaymentMethods';
import { DashboardProduction } from './pages/DashboardProduction';
import { DashboardActors } from './pages/DashboardActors';
import { DashboardCrew } from './pages/DashboardCrew';
import { DashboardAvailability } from './pages/DashboardAvailability';
import { DashboardReports } from './pages/DashboardReports';
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { Integrations } from './pages/Integrations';
import { Changelog } from './pages/Changelog';
import { ApiDocs } from './pages/ApiDocs';
import { FeatureFilms } from './pages/FeatureFilms';
import { TvSeries } from './pages/TvSeries';
import { Commercials } from './pages/Commercials';
import { IndependentFilms } from './pages/IndependentFilms';
import { Documentaries } from './pages/Documentaries';
import { HelpCenter } from './pages/HelpCenter';
import { Blog } from './pages/Blog';
import { Tutorials } from './pages/Tutorials';
import { CaseStudies } from './pages/CaseStudies';
import { Webinars } from './pages/Webinars';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { PressKit } from './pages/PressKit';
import { Partners } from './pages/Partners';
import { PartnersApplication } from './pages/PartnersApplication';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { StripeConfig } from './pages/StripeConfig';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/subscription" element={<DashboardSubscription />} />
        <Route path="/dashboard/settings" element={<DashboardSettings />} />
        <Route path="/dashboard/profile" element={<DashboardProfile />} />
        <Route path="/dashboard/account" element={<DashboardAccount />} />
        <Route path="/dashboard/calendar" element={<DashboardCalendar />} />
        <Route path="/dashboard/projects" element={<DashboardProjects />} />
        <Route path="/dashboard/invoices" element={<DashboardInvoices />} />
        <Route path="/dashboard/emails" element={<DashboardEmails />} />
        <Route path="/dashboard/payment-methods" element={<DashboardPaymentMethods />} />
        <Route path="/dashboard/production" element={<DashboardProduction />} />
        <Route path="/dashboard/actors" element={<DashboardActors />} />
        <Route path="/dashboard/crew" element={<DashboardCrew />} />
        <Route path="/dashboard/availability" element={<DashboardAvailability />} />
        <Route path="/dashboard/reports" element={<DashboardReports />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/api" element={<ApiDocs />} />
        <Route path="/use-cases/feature-films" element={<FeatureFilms />} />
        <Route path="/use-cases/tv-series" element={<TvSeries />} />
        <Route path="/use-cases/commercials" element={<Commercials />} />
        <Route path="/use-cases/independent-films" element={<IndependentFilms />} />
        <Route path="/use-cases/documentaries" element={<Documentaries />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/press" element={<PressKit />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/apply" element={<PartnersApplication />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/stripe-config" element={<StripeConfig />} />
      </Routes>
    </Router>
  );
}