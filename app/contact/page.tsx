'use client';

import {
    AlertCircle,
    CheckCircle,
    Clock,
    Mail,
    MapPin,
    Phone,
    Send
} from 'lucide-react';
import { useState } from 'react';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100">
              Get in touch with us — we're ready to help you!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                    <p className="text-sm text-green-700">We'll contact you shortly.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-900">Failed to Send</h4>
                    <p className="text-sm text-red-700">Please try again later.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="+880 1234 567890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Sales">Sales</option>
                    <option value="Service Request">Service Request</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-white h-full">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  Let's Connect
                </h2>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  We're here to assist you with all your machinery and equipment needs.
                  <br />
                  Reach out to us today!
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPin size={22} className="flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Our Address</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      92, Wise Market, Nawabpur Road, <br />
                      Nawabpur, Dhaka-1100
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone size={22} className="flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                    <p className="text-blue-100 text-sm">
                      <a href="tel:+8801897914480" className="hover:underline">
                        +88 01897914480
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail size={22} className="flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                    <p className="text-blue-100 text-sm">
                      <a href="mailto:info@muazbdd.net" className="hover:underline">
                        info@muazbdd.net
                      </a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4 items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Clock size={22} className="flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-blue-100 text-sm">
                      Saturday - Thursday: 9:00 AM - 8:00 PM
                      <br />
                      Friday: Closed
                    </p>
                  </div>
                </div>

                {/* Social Media - React Icons ব্যবহার করে */}
                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href="https://www.facebook.com/muaztechnology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                      aria-label="Facebook"
                    >
                      <FaFacebook size={22} />
                    </a>
                    <a
                      href="https://twitter.com/muaztechnology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                      aria-label="Twitter"
                    >
                      <FaTwitter size={22} />
                    </a>
                    <a
                      href="https://linkedin.com/company/muaztechnology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={22} />
                    </a>
                    <a
                      href="https://youtube.com/muaztechnology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                      aria-label="YouTube"
                    >
                      <FaYoutube size={22} />
                    </a>
                    <a
                      href="https://instagram.com/muaztechnology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition duration-300 transform hover:scale-110"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={22} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-8 pt-6 border-t border-blue-500">
                <p className="text-blue-100 text-xs text-center">
                  🚀 Quick response guaranteed within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-64 sm:h-80 lg:h-96 w-full bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.456!2d90.406!3d23.730!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b6f5b5b5b5%3A0xb5b5b5b5b5b5b5b5!2sNawabpur%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Office Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}