export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  hero_image: string;
  hero_video?: string;
  benefits: Benefit[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  created_at: string;
  updated_at: string;
}
