import { PageLayout } from "../components/PageLayout";
import { Download, FileText, Image as ImageIcon, Award } from "lucide-react";
import jsPDF from "jspdf";
import logo from "figma:asset/c551745208ab5a66bd631a9b0efa045b89a039ad.png";

const assets = [
  {
    icon: FileText,
    title: "Company Overview",
    description: "FilmLot360 background, mission, and key facts",
    format: "PDF"
  },
  {
    icon: ImageIcon,
    title: "Logo Pack",
    description: "High-resolution logos in multiple formats",
    format: "ZIP"
  },
  {
    icon: ImageIcon,
    title: "Product Screenshots",
    description: "High-quality product images",
    format: "ZIP"
  },
  {
    icon: Award,
    title: "Awards & Recognition",
    description: "Industry awards and accolades",
    format: "PDF"
  }
];

export function PressKit() {
  // Generate comprehensive press release PDF
  const generatePressReleasePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = 20;

    // Helper function to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 11) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.5);
    };

    // Add logo (convert to base64 if needed)
    const logoImg = new Image();
    logoImg.src = logo;
    
    // Header with logo placeholder
    doc.setFillColor(120, 0, 255); // Purple
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setFillColor(255, 0, 128); // Pink gradient effect
    doc.rect(pageWidth * 0.6, 0, pageWidth * 0.4, 40, 'F');
    
    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("FilmLot360", margin, 25);
    
    yPosition = 55;
    
    // Press Release Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(20);
    doc.text("PRESS RELEASE", pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Main headline
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    yPosition = addText(
      "FilmLot360: Revolutionizing Film Production Management for the Modern Entertainment Industry",
      margin,
      yPosition,
      pageWidth - (margin * 2),
      16
    );
    yPosition += 15;
    
    // Subheadline
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(12);
    yPosition = addText(
      "Leading CRM Platform Empowers 50,000+ Filmmakers Across 150 Countries with Comprehensive Production Tools",
      margin,
      yPosition,
      pageWidth - (margin * 2),
      12
    );
    yPosition += 15;
    
    // About section
    doc.setFontSize(14);
    doc.setTextColor(120, 0, 255);
    doc.text("ABOUT FILMLOT360", margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    yPosition = addText(
      "FilmLot360 is the leading production management CRM built specifically for the film and entertainment industry. Founded in 2020 by experienced filmmakers, the platform serves over 50,000 users across 150 countries.",
      margin,
      yPosition,
      pageWidth - (margin * 2)
    );
    yPosition += 10;
    
    yPosition = addText(
      "Our mission is to empower filmmakers with technology that simplifies production management, allowing them to focus on creativity rather than administration.",
      margin,
      yPosition,
      pageWidth - (margin * 2)
    );
    yPosition += 15;
    
    // Key Features
    doc.setFontSize(14);
    doc.setTextColor(120, 0, 255);
    doc.text("KEY FEATURES & CAPABILITIES", margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const features = [
      "Project Management: Comprehensive tools for managing multiple film projects simultaneously",
      "Cast & Crew Management: Complete database for actors, directors, and production staff",
      "Budget Tracking: Real-time financial monitoring and expense management",
      "Call Sheets: Automated generation and distribution of daily production schedules",
      "Invoice Management: Streamlined billing and payment processing",
      "Document Management: Centralized storage for scripts, contracts, and releases",
      "Location Scouting: Tools for discovering and managing filming locations",
      "Production Scheduling: Advanced timeline and milestone tracking"
    ];
    
    features.forEach(feature => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }
      yPosition = addText(`• ${feature}`, margin + 5, yPosition, pageWidth - (margin * 2) - 5);
      yPosition += 5;
    });
    
    yPosition += 10;
    
    // Key Statistics
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(120, 0, 255);
    doc.text("KEY STATISTICS", margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const stats = [
      "50,000+ Active Users worldwide",
      "150+ Countries served",
      "$2.5B+ in Production Budgets managed",
      "10,000+ Projects completed",
      "99.9% Platform uptime",
      "4.8/5 Average user rating"
    ];
    
    stats.forEach(stat => {
      yPosition = addText(`• ${stat}`, margin + 5, yPosition, pageWidth - (margin * 2) - 5);
      yPosition += 5;
    });
    
    yPosition += 15;
    
    // Awards
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(120, 0, 255);
    doc.text("AWARDS & RECOGNITION", margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const awards = [
      "Best Production Management Software 2024 - Film Tech Awards",
      "Innovation in Entertainment Technology - NAB Show 2023",
      "Top 10 SaaS Solutions for Media - TechCrunch",
      "Excellence in Film Technology - Cannes Lions 2023"
    ];
    
    awards.forEach(award => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
      yPosition = addText(`• ${award}`, margin + 5, yPosition, pageWidth - (margin * 2) - 5);
      yPosition += 5;
    });
    
    // Contact Information
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    } else {
      yPosition += 15;
    }
    
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, yPosition - 5, pageWidth - (margin * 2), 50, 'F');
    
    doc.setFontSize(14);
    doc.setTextColor(120, 0, 255);
    doc.text("MEDIA CONTACT", margin + 5, yPosition + 5);
    yPosition += 15;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("Email: press@filmlot360.com", margin + 5, yPosition);
    yPosition += 7;
    doc.text("Phone: +1 (555) 123-4567", margin + 5, yPosition);
    yPosition += 7;
    doc.text("Address: Tampa, FL 33612", margin + 5, yPosition);
    yPosition += 7;
    doc.text("Website: www.filmlot360.com", margin + 5, yPosition);
    
    // Footer
    const footerY = pageHeight - 15;
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("© 2025 FilmLot360, Inc. All rights reserved.", pageWidth / 2, footerY, { align: 'center' });
    
    // Save the PDF
    doc.save("FilmLot360_Press_Release.pdf");
  };

  // Generate comprehensive press release Word document (as HTML)
  const generatePressReleaseWord = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>FilmLot360 Press Release</title>
        <style>
          body {
            font-family: 'Calibri', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
          }
          .header {
            background: linear-gradient(135deg, #7800ff 0%, #ff0080 100%);
            padding: 30px;
            text-align: center;
            margin-bottom: 40px;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 36px;
          }
          .date {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
          }
          h1 {
            color: #7800ff;
            font-size: 28px;
            margin-top: 30px;
          }
          h2 {
            color: #7800ff;
            font-size: 20px;
            margin-top: 25px;
            border-bottom: 2px solid #ff0080;
            padding-bottom: 5px;
          }
          .headline {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 30px 0 15px 0;
            color: #000;
          }
          .subheadline {
            font-size: 16px;
            text-align: center;
            color: #555;
            margin-bottom: 30px;
            font-style: italic;
          }
          ul {
            margin: 15px 0;
            padding-left: 25px;
          }
          li {
            margin: 8px 0;
          }
          .contact-box {
            background: #f5f5f5;
            padding: 20px;
            margin-top: 40px;
            border-left: 4px solid #7800ff;
          }
          .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #999;
            font-size: 12px;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
          }
          .stat-item {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>FilmLot360</h1>
        </div>
        
        <div style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
          PRESS RELEASE
        </div>
        
        <div class="date">
          ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        
        <div class="headline">
          FilmLot360: Revolutionizing Film Production Management for the Modern Entertainment Industry
        </div>
        
        <div class="subheadline">
          Leading CRM Platform Empowers 50,000+ Filmmakers Across 150 Countries with Comprehensive Production Tools
        </div>
        
        <h2>ABOUT FILMLOT360</h2>
        <p>
          FilmLot360 is the leading production management CRM built specifically for the film and entertainment industry. 
          Founded in 2020 by experienced filmmakers, the platform serves over 50,000 users across 150 countries.
        </p>
        <p>
          Our mission is to empower filmmakers with technology that simplifies production management, allowing them to 
          focus on creativity rather than administration.
        </p>
        
        <h2>KEY FEATURES & CAPABILITIES</h2>
        <ul>
          <li><strong>Project Management:</strong> Comprehensive tools for managing multiple film projects simultaneously</li>
          <li><strong>Cast & Crew Management:</strong> Complete database for actors, directors, and production staff</li>
          <li><strong>Budget Tracking:</strong> Real-time financial monitoring and expense management</li>
          <li><strong>Call Sheets:</strong> Automated generation and distribution of daily production schedules</li>
          <li><strong>Invoice Management:</strong> Streamlined billing and payment processing</li>
          <li><strong>Document Management:</strong> Centralized storage for scripts, contracts, and releases</li>
          <li><strong>Location Scouting:</strong> Tools for discovering and managing filming locations</li>
          <li><strong>Production Scheduling:</strong> Advanced timeline and milestone tracking</li>
        </ul>
        
        <h2>KEY STATISTICS</h2>
        <div class="stats-grid">
          <div class="stat-item"><strong>50,000+</strong> Active Users worldwide</div>
          <div class="stat-item"><strong>150+</strong> Countries served</div>
          <div class="stat-item"><strong>$2.5B+</strong> in Production Budgets managed</div>
          <div class="stat-item"><strong>10,000+</strong> Projects completed</div>
          <div class="stat-item"><strong>99.9%</strong> Platform uptime</div>
          <div class="stat-item"><strong>4.8/5</strong> Average user rating</div>
        </div>
        
        <h2>AWARDS & RECOGNITION</h2>
        <ul>
          <li>Best Production Management Software 2024 - Film Tech Awards</li>
          <li>Innovation in Entertainment Technology - NAB Show 2023</li>
          <li>Top 10 SaaS Solutions for Media - TechCrunch</li>
          <li>Excellence in Film Technology - Cannes Lions 2023</li>
        </ul>
        
        <h2>PRICING & PLANS</h2>
        <p>FilmLot360 offers three comprehensive subscription plans designed to meet the needs of productions of all sizes:</p>
        <ul>
          <li><strong>Starter Plan:</strong> Ideal for independent filmmakers and small productions</li>
          <li><strong>Growth Plan:</strong> Perfect for growing production companies managing multiple projects</li>
          <li><strong>Professional Plan:</strong> Enterprise-grade solution for large studios and production houses</li>
        </ul>
        
        <div class="contact-box">
          <h2 style="margin-top: 0; border: none;">MEDIA CONTACT</h2>
          <p style="margin: 5px 0;"><strong>Email:</strong> press@filmlot360.com</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> Tampa, FL 33612</p>
          <p style="margin: 5px 0;"><strong>Website:</strong> www.filmlot360.com</p>
        </div>
        
        <div class="footer">
          © 2025 FilmLot360, Inc. All rights reserved.
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FilmLot360_Press_Release.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PageLayout 
      title="Press Kit" 
      subtitle="Resources for media and press inquiries"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Company Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 mb-12">
            <h3 className="text-3xl text-white mb-6">About FilmLot360</h3>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                FilmLot360 is the leading production management CRM built specifically for the film 
                and entertainment industry. Founded in 2020 by experienced filmmakers, the platform 
                serves over 50,000 users across 150 countries.
              </p>
              <p>
                Our mission is to empower filmmakers with technology that simplifies production 
                management, allowing them to focus on creativity rather than administration.
              </p>
            </div>
          </div>

          {/* Download Assets */}
          <h3 className="text-3xl text-white mb-8">Press Assets</h3>
          
          {/* Comprehensive Press Release Download */}
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-2 border-purple-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl text-white mb-3">Complete Press Release Package</h4>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Download our comprehensive press release with FilmLot360 branding, company overview, features, statistics, awards, and contact information - all in one professionally formatted document.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={generatePressReleasePDF}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={generatePressReleaseWord}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Word Doc
                </button>
              </div>
            </div>
          </div>
          
          {/* Individual Assets */}
          <h3 className="text-2xl text-white mb-6">Individual Assets</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {assets.map((asset, index) => {
              const handleDownload = () => {
                // Create a blob with sample content based on asset type
                let blob: Blob;
                let filename: string;

                if (asset.format === 'PDF') {
                  // Create a simple text file as placeholder for PDF
                  const content = `FilmLot360 - ${asset.title}\n\n${asset.description}\n\nThis is a placeholder file. In production, this would be the actual ${asset.title.toLowerCase()}.`;
                  blob = new Blob([content], { type: 'text/plain' });
                  filename = `FilmLot360_${asset.title.replace(/\s+/g, '_')}.txt`;
                } else {
                  // Create a simple text file as placeholder for ZIP
                  const content = `FilmLot360 - ${asset.title}\n\nThis archive would contain:\n${asset.description}\n\nFormat: ${asset.format}`;
                  blob = new Blob([content], { type: 'text/plain' });
                  filename = `FilmLot360_${asset.title.replace(/\s+/g, '_')}.txt`;
                }

                // Create download link and trigger download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              };

              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                        <asset.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl text-white mb-2">{asset.title}</h4>
                      <p className="text-gray-400 mb-4">{asset.description}</p>
                      <span className="text-sm text-gray-500">{asset.format}</span>
                    </div>
                    <button 
                      onClick={handleDownload}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group-hover:scale-110"
                      aria-label={`Download ${asset.title}`}
                    >
                      <Download className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Media Contact */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl text-white mb-4">Media Inquiries</h3>
            <p className="text-xl text-gray-300 mb-6">
              For press inquiries, interviews, or additional information
            </p>
            <div className="text-gray-300">
              <p className="mb-2">Email: press@filmlot360.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}