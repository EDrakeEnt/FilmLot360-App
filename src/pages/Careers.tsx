import { PageLayout } from "../components/PageLayout";
import { Briefcase, MapPin, Clock, X } from "lucide-react";
import { useState } from "react";

const jobs = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    description: "We're looking for an experienced Full Stack Engineer to help build the future of film production management software. You'll work on cutting-edge features that help production teams worldwide manage their projects more efficiently.",
    responsibilities: [
      "Design and implement scalable features across our React and Node.js stack",
      "Collaborate with product and design teams to deliver exceptional user experiences",
      "Write clean, maintainable code with comprehensive test coverage",
      "Mentor junior engineers and contribute to technical architecture decisions",
      "Participate in code reviews and help establish best practices"
    ],
    requirements: [
      "5+ years of experience with React, TypeScript, and Node.js",
      "Strong understanding of database design and API development",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Excellent problem-solving and communication skills",
      "Passion for building products that solve real-world problems"
    ],
    niceToHave: [
      "Experience in the film or entertainment industry",
      "Background in project management software",
      "Contributions to open-source projects"
    ]
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    description: "Join our design team to craft beautiful, intuitive experiences for film production professionals. You'll work closely with our product and engineering teams to design features that delight our users and solve complex workflow challenges.",
    responsibilities: [
      "Lead design projects from concept to execution",
      "Create wireframes, prototypes, and high-fidelity designs in Figma",
      "Conduct user research and usability testing to validate design decisions",
      "Collaborate with engineers to ensure pixel-perfect implementation",
      "Maintain and evolve our design system and brand guidelines"
    ],
    requirements: [
      "3+ years of experience in product design, preferably for B2B SaaS",
      "Expert proficiency in Figma and modern design tools",
      "Strong portfolio demonstrating end-to-end product design",
      "Understanding of design systems and component-based design",
      "Excellent communication and presentation skills"
    ],
    niceToHave: [
      "Experience designing for the film or creative industries",
      "Knowledge of front-end development (HTML, CSS, React)",
      "Motion design and animation skills"
    ]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "As a Customer Success Manager, you'll be the trusted advisor for our film production clients, helping them maximize value from FilmLot360. You'll work with studios, independent producers, and production companies to ensure they achieve their goals.",
    responsibilities: [
      "Own the customer journey from onboarding through renewal",
      "Build strong relationships with production teams and decision-makers",
      "Conduct regular business reviews and identify expansion opportunities",
      "Gather customer feedback and advocate for product improvements",
      "Create educational content and best practice guides"
    ],
    requirements: [
      "3+ years in customer success, account management, or similar role",
      "Experience with B2B SaaS products and CRM systems",
      "Excellent communication and relationship-building skills",
      "Data-driven approach to measuring customer health and success",
      "Ability to manage multiple accounts and priorities"
    ],
    niceToHave: [
      "Background in film production or entertainment industry",
      "Experience with project management methodologies",
      "Technical aptitude and ability to troubleshoot issues"
    ]
  },
  {
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Los Angeles, CA / Remote",
    type: "Full-time",
    description: "We're seeking a creative Content Marketing Manager to tell the FilmLot360 story and establish us as thought leaders in film production technology. You'll create compelling content that educates, engages, and converts our target audience.",
    responsibilities: [
      "Develop and execute content strategy across blog, social media, and video",
      "Create case studies, whitepapers, and educational resources",
      "Collaborate with customers to showcase their success stories",
      "Optimize content for SEO and lead generation",
      "Track and report on content performance and ROI"
    ],
    requirements: [
      "4+ years of content marketing experience, preferably in B2B SaaS",
      "Exceptional writing and storytelling skills",
      "Experience with content management systems and marketing automation tools",
      "Understanding of SEO best practices and analytics",
      "Creative mindset with strong attention to detail"
    ],
    niceToHave: [
      "Knowledge of film production or entertainment industry",
      "Video production and editing skills",
      "Experience with paid content distribution and amplification"
    ]
  }
];

export function Careers() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  return (
    <PageLayout 
      title="Careers" 
      subtitle="Join us in revolutionizing film production"
    >
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-2xl p-12 mb-16 text-center">
            <h3 className="text-3xl text-white mb-4">Why Work at FilmLot360?</h3>
            <p className="text-xl text-gray-300 mb-8">
              We're a small but mighty team passionate about filmmaking and technology. 
              Join us and help shape the future of film production.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                "Competitive salary & equity",
                "Health, dental & vision",
                "Unlimited PTO",
                "Remote-friendly",
                "Learning budget",
                "Film festival tickets"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-3xl text-white mb-8">Open Positions</h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-2xl text-white mb-3">{job.title}</h4>
                    <div className="flex flex-wrap gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(index)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Description Modal */}
      {selectedJob !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedJob(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-3xl text-white mb-2">{jobs[selectedJob].title}</h3>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {jobs[selectedJob].department}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {jobs[selectedJob].location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {jobs[selectedJob].type}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed">{jobs[selectedJob].description}</p>
              </div>

              <div>
                <h4 className="text-2xl text-white mb-4">Responsibilities</h4>
                <ul className="space-y-3">
                  {jobs[selectedJob].responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-2xl text-white mb-4">Requirements</h4>
                <ul className="space-y-3">
                  {jobs[selectedJob].requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-2xl text-white mb-4">Nice to Have</h4>
                <ul className="space-y-3">
                  {jobs[selectedJob].niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-lg">
                  Submit Application
                </button>
                <p className="text-center text-gray-400 mt-4">
                  Applications will be sent to careers@filmlot360.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}