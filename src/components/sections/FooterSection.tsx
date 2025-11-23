import Container from '@/components/ui/Container';
import type { ContactInfo } from '@/types/landing';

interface FooterSectionProps {
  contact: ContactInfo;
}

export default function FooterSection({ contact }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { key: 'twitter', icon: 'X', url: contact.social.twitter },
    { key: 'facebook', icon: 'FB', url: contact.social.facebook },
    { key: 'linkedin', icon: 'LI', url: contact.social.linkedin },
    { key: 'instagram', icon: 'IG', url: contact.social.instagram },
  ].filter(link => link.url);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="mr-3">@</span>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <span className="mr-3">Tel:</span>
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-start">
                <span className="mr-3 mt-1">Addr:</span>
                <span className="text-gray-300">{contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
            <div className="flex flex-col space-y-3">
              {socialLinks.map(({ key, icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <span className="mr-3 font-mono">{icon}</span>
                  <span className="capitalize">{key}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {currentYear} Landing Builder. All rights reserved. Built with modern web technologies.
          </p>
        </div>
      </Container>
    </footer>
  );
}
