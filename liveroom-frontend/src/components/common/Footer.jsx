import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">LearnHub</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-md">
              Empowering learners worldwide with high-quality online courses and interactive learning experiences.
              Join thousands of students in their journey to success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a></li>
              <li><a href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">Courses</a></li>
              <li><a href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</a></li>
              <li><a href="/upload" className="hover:text-blue-600 dark:hover:text-blue-400">Upload Course</a></li>
              <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">support@learnhub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">123 Learning St, Education City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-600 dark:text-gray-400">Get the latest updates on new courses and features.</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 LearnHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a>
            <a href="/cookies" className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
