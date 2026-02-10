import { FiExternalLink, FiGithub, FiFolder } from "react-icons/fi";

export default function Projects() {
  const projects = [
    {
      title: "Fur & Feather Fam",
      description: "A full-featured pet adoption web application with Laravel framework, featuring pet listing, adoption processing, user management, and admin analytics.",
      tags: ["Laravel", "PHP", "MySQL", "Full-Stack"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Web Development"
    },
    {
      title: "One Stop Gamers' Solution",
      description: "Dynamic website using PHP and MySQL offering gaming-related content and features tailored to user preferences.",
      tags: ["PHP", "MySQL", "JavaScript", "Responsive"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Web Development"
    },
    {
      title: "EEG Emotion Analysis",
      description: "Undergraduate Thesis: Designed novel brain source localization algorithm (AgLORETA) for EEG-based emotion recognition using DEAP dataset.",
      tags: ["Python", "Machine Learning", "Signal Processing", "Research"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Machine Learning"
    },
    {
      title: "Chronic Kidney Disease Prediction",
      description: "Applied ML models to predict Chronic Kidney Disease using Kaggle dataset with various classification algorithms.",
      tags: ["Python", "Scikit-learn", "Pandas", "Data Science"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Data Science"
    },
    {
      title: "Metro Network Simulation",
      description: "Designed and implemented multi-site network with subnetting, VLSM, static routing, and DHCP setup across 12 LAN and WAN segments.",
      tags: ["Cisco", "Networking", "Subnetting", "Routing"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Networking"
    },
    {
      title: "Vanilla JS Games Collection",
      description: "Collection of interactive games including Rock Paper Scissor, Memory Game, and Whac-a-Mole built with pure JavaScript.",
      tags: ["JavaScript", "HTML5", "CSS3", "Games"],
      github: "https://github.com/Rafsanul",
      live: null,
      category: "Frontend"
    }
  ];

  const categories = ["All", "Web Development", "Machine Learning", "Data Science", "Networking", "Frontend"];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">{">_ "}</span>
            <span className="gradient-text">PROJECTS</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            A collection of my technical projects showcasing skills in web development, 
            machine learning, and full-stack applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full font-mono text-sm border border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-cyan-400 text-2xl">
                  <FiFolder />
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title="View on GitHub"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                  {/* External link removed - only GitHub remains */}
                </div>
              </div>

              {/* Project Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-xs font-mono rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-3 py-1 bg-black/50 text-gray-300 text-xs font-mono rounded border border-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Projects", value: "15+", color: "text-cyan-400" },
              { label: "Web Apps", value: "8", color: "text-blue-400" },
              { label: "ML Projects", value: "4", color: "text-purple-400" },
              { label: "Open Source", value: "3", color: "text-green-400" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-400 text-sm font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}