export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  button_text: string;
  hero_image?: string;
  benefits: Benefit[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  liquid_glass_enabled?: boolean;
  created_at?: string;
  updated_at?: string;
}