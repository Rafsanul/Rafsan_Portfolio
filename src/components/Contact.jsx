import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from "react-icons/fa";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Simple EmailJS call
      const result = await emailjs.send(
        'service_quhof9b',
        'template_tag6069',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString()
        },
        'iNH_kCAKgt3QkHu13'
      );
      
      console.log('Success:', result);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (err) {
      console.error('Failed:', err);
      setError(`Error: ${err.text || 'Please email me directly at rafsanthekod@gmail.com'}`);
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: "EMAIL",
      value: "rafsanthekod@gmail.com",
      action: () => window.open('mailto:rafsanthekod@gmail.com'),
      color: "text-cyan-400"
    },
    {
      icon: <FiPhone />,
      title: "PHONE",
      value: "+880 1648 4331726",
      action: () => window.open('tel:+8801648431726'),
      color: "text-blue-400"
    },
    {
      icon: <FiMapPin />,
      title: "LOCATION",
      value: "Dhaka, Bangladesh",
      action: null,
      color: "text-purple-400"
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/Rafsanul", label: "GitHub", color: "hover:text-white" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/rafsanul-islam-70833a27a/", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: <FaCode />, href: "https://leetcode.com/u/Rafsanthekod/", label: "LeetCode", color: "hover:text-yellow-400" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/rafsan_i_udoy/", label: "Instagram", color: "hover:text-pink-400" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">{">_ "}</span>
            <span className="gradient-text">GET_IN_TOUCH</span>
          </h1>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  onClick={info.action || undefined}
                  className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl ${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm font-mono mb-1">{info.title}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-3xl text-gray-500 ${social.color} transition-all duration-300 hover:scale-125`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-900/50 border border-green-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-green-400">Currently Available</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Open to full-time positions, freelance projects, and collaboration opportunities.
                Response time: Within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
                  <p className="text-gray-400 mb-8">
                    Fill out the form below and I'll respond promptly.
                  </p>

                  {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
                      <p className="text-red-400">{error}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        You can also email me directly at{" "}
                        <a href="mailto:rafsanthekod@gmail.com" className="text-cyan-400 hover:underline">
                          rafsanthekod@gmail.com
                        </a>
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2 font-mono">YOUR_NAME</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2 font-mono">EMAIL_ADDRESS</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 font-mono">SUBJECT</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-2 font-mono">MESSAGE</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full bg-black/50 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        placeholder="Your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          SENDING...
                        </>
                      ) : (
                        <>
                          <FiSend />
                          SEND MESSAGE
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-black/30 border border-gray-800 rounded-lg">
              <p className="text-gray-400 text-sm text-center">
                You can also directly email me at{" "}
                <a href="mailto:rafsanthekod@gmail.com" className="text-cyan-400 hover:underline">
                  rafsanthekod@gmail.com
                </a>{" "}
                or call me at{" "}
                <a href="tel:+8801648431726" className="text-cyan-400 hover:underline">
                  +880 1648 4331726
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}