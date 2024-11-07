import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Banner() {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Blockchain Developer
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Crafting decentralized experiences and building the future of Web3
          </p>
          <div className="flex space-x-4">
            <a
              href="#contact"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition"
            >
              Get in Touch
            </a>
            <a
              href="/resume.pdf"
              className="border border-purple-500 text-purple-500 px-8 py-3 rounded-lg hover:bg-purple-500 hover:text-white transition"
              download
            >
              Download CV
            </a>
          </div>
          <div className="flex space-x-6 mt-12">
            <a href="https://github.com" className="text-gray-400 hover:text-purple-500 transition">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-purple-500 transition">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-purple-500 transition">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}