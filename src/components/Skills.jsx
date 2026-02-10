import { FiCode, FiDatabase, FiCpu, FiCloud, FiTool } from "react-icons/fi";

export default function Skills() {
  const skills = [
    {
      category: "Frontend Development",
      icon: <FiCode />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400",
      items: [
        { name: "React", level: 85 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "TypeScript", level: 75 },
      ]
    },
    {
      category: "Backend Development",
      icon: <FiDatabase />,
      color: "text-blue-400",
      bgColor: "bg-blue-400",
      items: [
        { name: "Node.js", level: 65 },
        { name: "Express.js", level: 60 },
        { name: "PHP", level: 75 },
        { name: "Laravel", level: 70 },
        { name: "MySQL", level: 80 },
      ]
    },
    {
      category: "Machine Learning",
      icon: <FiCpu />,
      color: "text-purple-400",
      bgColor: "bg-purple-400",
      items: [
        { name: "Python", level: 85 },
        { name: "TensorFlow", level: 75 },
        { name: "Scikit-learn", level: 85 },
        { name: "Pandas/Numpy", level: 90 },
        { name: "Data Analysis", level: 85 },
      ]
    },
    {
      category: "Networking & Tools",
      icon: <FiCloud />,
      color: "text-green-400",
      bgColor: "bg-green-400",
      items: [
        { name: "Cisco Networking", level: 70 },
        { name: "Subnetting", level: 75 },
        { name: "Git/GitHub", level: 85 },
        { name: "Docker", level: 60 },
        { name: "VS Code", level: 90 },
      ]
    },
    {
      category: "Soft Skills",
      icon: <FiTool />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400",
      items: [
        { name: "Team Leadership", level: 95 },
        { name: "Problem Solving", level: 100 },
        { name: "Communication", level: 90 },
        { name: "Project Management", level: 85 },
        { name: "Adaptability", level: 100 },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">{">_ "}</span>
            <span className="gradient-text">SKILLS</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Technical expertise and professional competencies acquired through academic projects 
            and real-world experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skillCategory, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/30 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`text-2xl ${skillCategory.color}`}>
                  {skillCategory.icon}
                </div>
                <h2 className={`text-2xl font-bold ${skillCategory.color}`}>
                  {skillCategory.category}
                </h2>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className={`text-sm font-mono ${skillCategory.color}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${skillCategory.bgColor}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Additional Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Git", "GitHub", "VS Code", "Postman", "XAMPP", "Figma",
              "Adobe Creative Suite", "Microsoft Office", "Jira", "Trello",
              "Cisco Packet Tracer", "EMU8086", "Quartus", "Google Cloud",
              "Firebase", "REST APIs", "GraphQL", "Webpack", "Vite"
            ].map((tool, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-black/50 text-gray-300 rounded-lg border border-gray-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Skill Development Timeline
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                { year: "2017-2019", title: "Foundations", skills: ["C Programming", "Data Structures", "Algorithms", "Computer Fundamentals"] },
                { year: "2020-2021", title: "Web Development", skills: ["Python", "HTML/CSS", "JavaScript", "PHP", "MySQL", "Responsive Design"] },
                { year: "2022", title: "Advanced Web", skills: ["React", "Node.js", "Laravel", "REST APIs", "Git Version Control"] },
                { year: "2023", title: "ML & Networking", skills: ["Machine Learning", "TensorFlow", "Cisco Networking", "Subnetting"] },
                { year: "2024-Present", title: "Professional", skills: ["Team Leadership", "Project Management", "Client Communication", "Full-Stack Development"] }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                      <div className="text-cyan-400 font-mono font-bold mb-2">{item.year}</div>
                      <h4 className="text-white font-bold text-lg mb-3">{item.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-black/30 text-gray-300 text-sm rounded border border-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-2 border-black"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}