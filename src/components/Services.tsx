import { Code2, Database, Layout } from 'lucide-react';

const services = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: 'Smart Contract Development',
    description: 'Building secure and efficient smart contracts using Solidity and Rust',
  },
  {
    icon: <Layout className="h-8 w-8" />,
    title: 'dApp Development',
    description: 'Creating intuitive and responsive decentralized applications',
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: 'Web3 Integration',
    description: 'Seamlessly connecting traditional web apps with blockchain technology',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-purple-500 transition group"
            >
              <div className="text-purple-500 mb-4 group-hover:scale-110 transition">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}