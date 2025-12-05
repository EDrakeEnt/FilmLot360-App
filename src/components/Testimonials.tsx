import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Producer",
    company: "Midnight Sun Productions",
    content: "FilmLot360 completely transformed how we manage our productions. We went from spreadsheet chaos to having complete visibility in real-time. Our last feature came in 15% under budget.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1631387019069-2ff599943f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHByb2R1Y2VyfGVufDF8fHx8MTc2NDM3NzY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Marcus Chen",
    role: "Director",
    company: "Chen Films",
    content: "I've worked on over 20 productions, and this is the first time I've felt truly organized. The scheduling features alone have saved us countless hours of back-and-forth coordination.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1612190219911-286df0e14656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMGRpcmVjdG9yfGVufDF8fHx8MTc2NDM3NzY0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Elena Rodriguez",
    role: "Line Producer",
    company: "Rodriguez Entertainment",
    content: "The budget tracking is a game-changer. I can see exactly where every dollar goes in real-time and make adjustments before problems become crises. It's like having X-ray vision for your production.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1727299781147-c7ab897883a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NDI4MzAzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "James Thompson",
    role: "Production Manager",
    company: "Thompson Media Group",
    content: "We manage 15-20 commercial shoots per month. FilmLot360 helps us juggle all of them without dropping any balls. The automation features are incredible – call sheets practically write themselves.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NjQzNDU0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "Priya Patel",
    role: "Executive Producer",
    company: "Patel Studios",
    content: "As someone who oversees multiple productions simultaneously, FilmLot360 gives me the bird's eye view I need. I can see every project's status, budget, and issues at a glance. Invaluable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1670223364099-eb3f7738cd93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQzNzc2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    name: "David Kim",
    role: "Independent Filmmaker",
    company: "Kim Productions",
    content: "I thought this kind of tool was only for big-budget productions, but FilmLot360 scales perfectly for indie films. It's made my passion project feel professional without breaking the bank.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1701980889802-55ff39e2e973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQzMDE4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,0,255,0.15),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,0,128,0.15),transparent_40%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-full">
            <span className="text-pink-300">Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-6xl text-white mb-6">
            Loved By
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Film Professionals
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what filmmakers say about FilmLot360.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400 mb-2 sm:mb-3 md:mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-2 sm:mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-5 md:mb-6 flex-grow leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"
                />
                <div>
                  <div className="text-sm sm:text-base text-white">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}