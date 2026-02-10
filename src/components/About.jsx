import { FiBriefcase, FiBook, FiAward, FiMapPin, FiUsers, FiGlobe } from "react-icons/fi";

export default function About() {
  const experiences = [
    {
      title: "Junior IT Executive",
      company: "PrimeIT • ImprintID (USA)",
      period: "2025 – Ongoing",
      description: "Maintain and update website content for ImprintID, ensuring accurate product data, visual consistency, and a seamless user experience.",
      details: [
        "Coordinate cross-functional team efforts and streamline workflows through Microsoft 365 Business Central and ERP systems",
        "Reduce turnaround time on project deliverables through efficient system utilization",
        "Develop and manage strong client relationships by understanding needs and delivering customized digital solutions",
        "Support client operations with effective use of Microsoft 365 Business Central and ERP platforms"
      ],
      icon: <FiBriefcase />,
      color: "cyan"
    },
    {
      title: "Squad Leader, Tech Support",
      company: "GAO TEK • GAO Group (Canada)",
      period: "Jan 2024 – Apr 2024",
      description: "Managed and coordinated a remote tech support team using WordPress Content Management System (CMS).",
      details: [
        "Oversaw task distribution, progress monitoring, and ensured timely completion of assignments",
        "Trained new interns on technical support protocols and procedures",
        "Maintained technical support database ensuring accuracy and consistency",
        "Kept records up-to-date across all platforms for seamless operations"
      ],
      icon: <FiUsers />,
      color: "blue"
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science and Engineering",
      institution: "BRAC University",
      period: "2017 - 2025",
      gpa: "CGPA: 3.3",
      icon: <FiBook />
    },
    {
      degree: "Higher Secondary School Certificate",
      institution: "Rajuk Uttara Model College",
      period: "2015 - 2017",
      gpa: "GPA: 4.92 (Science)",
      icon: <FiBook />
    }
  ];

  const achievements = [
    {
      title: "Government Scholarship Recipient",
      description: "Awarded by Government of Bangladesh for outstanding academic performance in PSC Examination",
      icon: <FiAward />
    },
    {
      title: "Senior Executive",
      description: "Administration and Creative Department, Football Club of BRAC University (FCBU)",
      icon: <FiAward />
    }
  ];

  const clients = [
    {
      name: "ImprintID",
      description: "USA-based promotional products company",
      icon: <FiGlobe />
    },
    {
      name: "GAO Group",
      description: "Canada-based global tech company",
      icon: <FiGlobe />
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">{">_ "}</span>
            <span className="gradient-text">PROFESSIONAL_EXPERIENCE</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            CSE graduate with expertise in web development, team coordination, and client management. 
            Passionate about delivering efficient digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Experience */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience Section */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <FiBriefcase />
                WORK_EXPERIENCE
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l border-cyan-500/30 last:pb-0 last:border-l-0">
                    <div className={`absolute -left-2 top-0 w-4 h-4 bg-${exp.color}-500 rounded-full`} />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-cyan-300 font-mono">{exp.company}</p>
                      </div>
                      <span className={`text-${exp.color}-300 font-mono text-sm bg-${exp.color}-500/10 px-3 py-1 rounded-full mt-2 sm:mt-0`}>
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">{exp.description}</p>
                      
                      {/* Client Section for PrimeIT */}
                      {exp.company.includes("ImprintID") && (
                        <div className="mb-4 p-4 bg-black/30 border border-cyan-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FiGlobe className="text-cyan-400" />
                            <span className="text-cyan-400 font-mono">Client:</span>
                            <span className="text-white font-bold">ImprintID (USA)</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            USA-based promotional products company
                          </p>
                        </div>
                      )}
                      
                      {/* Client Section for GAO TEK */}
                      {exp.company.includes("GAO TEK") && (
                        <div className="mb-4 p-4 bg-black/30 border border-blue-500/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FiGlobe className="text-blue-400" />
                            <span className="text-blue-400 font-mono">Client:</span>
                            <span className="text-white font-bold">GAO Group (Canada)</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Canada-based global tech company
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Details List */}
                    <div className="space-y-2">
                      {exp.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${exp.color}-500 mt-2 flex-shrink-0`}></div>
                          <p className="text-gray-400 text-sm">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                <FiBook />
                EDUCATION
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l border-blue-500/30 last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <span className="text-blue-300 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{edu.institution}</p>
                    <p className="text-cyan-300 font-mono">{edu.gpa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <FiAward />
                ACHIEVEMENTS
              </h2>
              <div className="space-y-4">
                {achievements.map((ach, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-purple-400">{ach.icon}</div>
                      <h4 className="font-bold text-white">{ach.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <FiGlobe />
                CLIENTS
              </h2>
              <div className="space-y-4">
                {clients.map((client, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-green-400">{client.icon}</div>
                      <h4 className="font-bold text-white">{client.name}</h4>
                    </div>
                    <p className="text-gray-400 text-sm">{client.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <FiMapPin />
                LOCATION
              </h2>
              <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Based in Bangladesh</h4>
                    <p className="text-gray-400 text-sm">Open to remote opportunities</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Timezone:</span>
                    <span className="text-cyan-300">GMT+6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Availability:</span>
                    <span className="text-green-300">Immediate</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-cyan-300">Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Technologies */}
        <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Key Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "WordPress CMS", "Microsoft 365 Business Central", "ERP Systems", 
              "Team Coordination", "Client Management", "Web Content Management",
              "Remote Team Management", "Technical Support", "Database Management",
              "Workflow Optimization", "Cross-functional Collaboration"
            ].map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-black/50 text-cyan-300 rounded-lg border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}