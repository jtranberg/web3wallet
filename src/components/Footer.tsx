import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              Let's Connect
            </h3>
            <div className="flex space-x-6">
              <a href="https://github.com" className="text-gray-400 hover:text-purple-500 transition">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-500 transition">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-purple-500 transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-purple-500 transition">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400">© 2024 Web3.Dev. All rights reserved.</p>
            <p className="text-gray-500 mt-2">Building the decentralized future</p>
          </div>
        </div>
      </div>
    </footer>
  );
}