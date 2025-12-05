import { Link } from "react-router-dom";
import { Film, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "API Documentation"],
  "Use Cases": ["Feature Films", "TV Series", "Commercials", "Independent Films", "Documentaries"],
  Resources: ["Help Center", "Blog", "Tutorials", "Webinars"],
  Company: ["About Us", "Careers", "Contact", "Press Kit", "Partners"]
};

// Map link text to routes
const linkRoutes: Record<string, string> = {
  "Features": "/features",
  "Pricing": "/pricing",
  "Integrations": "/integrations",
  "Changelog": "/changelog",
  "API Documentation": "/api",
  "Feature Films": "/use-cases/feature-films",
  "TV Series": "/use-cases/tv-series",
  "Commercials": "/use-cases/commercials",
  "Independent Films": "/use-cases/independent-films",
  "Documentaries": "/use-cases/documentaries",
  "Help Center": "/help",
  "Blog": "/blog",
  "Tutorials": "/tutorials",
  "Webinars": "/webinars",
  "About Us": "/about",
  "Careers": "/careers",
  "Contact": "/contact",
  "Press Kit": "/press",
  "Partners": "/partners"
};

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="FilmLot360 Logo" className="w-10 h-10 object-contain" />
              <span className="text-white text-2xl">FilmLot360</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The complete production management CRM built by filmmakers, for filmmakers. Manage projects, crew, budgets, and more from one powerful platform.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link to={linkRoutes[link]} className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 FilmLot360. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}