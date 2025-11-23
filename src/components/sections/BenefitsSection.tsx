import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import type { Benefit } from '@/types/landing';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section className="py-24 bg-white">
      <Container>
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages that make our solution the perfect choice for your needs
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
