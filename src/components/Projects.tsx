const projects = [
  {
    title: 'DeFi Exchange',
    description: 'A decentralized exchange platform with automated market maker functionality',
    image: 'https://images.unsplash.com/photo-1645726165892-f4097959c957?q=80&w=2070',
    tags: ['React', 'Solidity', 'Web3.js'],
    link: '#',
  },
  {
    title: 'NFT Marketplace',
    description: 'A platform for minting and trading unique digital assets',
    image: 'https://images.unsplash.com/photo-1644788260666-d0821bcf3c3c?q=80&w=2070',
    tags: ['Next.js', 'IPFS', 'Ethereum'],
    link: '#',
  },
  {
    title: 'DAO Platform',
    description: 'Decentralized governance platform for community decision making',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070',
    tags: ['TypeScript', 'Smart Contracts', 'The Graph'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden bg-black border border-gray-800 hover:border-purple-500 transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-purple-500/10 text-purple-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-purple-500 hover:text-purple-400 transition"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}