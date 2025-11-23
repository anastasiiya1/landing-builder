-- Migration to create landings table structure matching exact requirements
-- Drop existing table if it exists (be careful with this in production!)
DROP TABLE IF EXISTS public.landings;

-- Create landings table with exact schema requirements
CREATE TABLE public.landings (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  button_text VARCHAR(255) NOT NULL,
  hero_image TEXT NOT NULL,
  benefits JSONB NOT NULL DEFAULT '[]',
  testimonials JSONB NOT NULL DEFAULT '[]',
  contact JSONB NOT NULL DEFAULT '{}',
  liquid_glass_enabled BOOLEAN NOT NULL DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX idx_landings_slug ON public.landings(slug);
CREATE INDEX idx_landings_liquid_glass ON public.landings(liquid_glass_enabled);

-- Enable Row Level Security (RLS)
ALTER TABLE public.landings ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (allow public read access)
CREATE POLICY "Allow public read access" ON public.landings
  FOR SELECT USING (true);

-- Allow authenticated users full access (for admin)
CREATE POLICY "Allow authenticated full access" ON public.landings
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data for testing with exact schema
INSERT INTO public.landings (slug, title, button_text, hero_image, benefits, testimonials, contact, liquid_glass_enabled) VALUES
  ('demo', 'Transform Your Business Today', 'Get Started Now', 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
   '[
     {"icon": "⚡", "title": "Lightning Fast", "description": "Experience blazing-fast performance that keeps your users engaged."},
     {"icon": "🔒", "title": "Secure & Reliable", "description": "Enterprise-grade security ensures your data is protected."},
     {"icon": "📊", "title": "Results Driven", "description": "Data-driven insights help you make informed decisions."}
   ]',
   '[
     {"name": "Sarah Johnson", "role": "CEO", "company": "TechStart Inc", "image": "https://images.unsplash.com/photo-1494790108755-2616b612b550?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "This platform transformed our entire workflow. 300% increase in efficiency!", "rating": 5},
     {"name": "Michael Chen", "role": "CTO", "company": "Innovation Labs", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Outstanding results and incredible support team. Highly recommended!", "rating": 5}
   ]',
   '{
     "email": "hello@landingbuilder.com",
     "phone": "+1 (555) 123-4567",
     "address": "123 Innovation Drive, Tech City, TC 12345",
     "social": {
       "twitter": "https://twitter.com/landingbuilder",
       "facebook": "https://facebook.com/landingbuilder",
       "linkedin": "https://linkedin.com/company/landingbuilder",
       "instagram": "https://instagram.com/landingbuilder"
     }
   }',
   true),
  ('tesla-model-s', 'Tesla Model S - The Future of Driving', 'Order Now', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
   '[
     {"icon": "🚗", "title": "Autopilot", "description": "Advanced driver assistance with full self-driving capability."},
     {"icon": "⚡", "title": "Ludicrous Mode", "description": "0-60 mph in 2.1 seconds with instant torque."},
     {"icon": "🔋", "title": "Long Range", "description": "Up to 405 miles of range on a single charge."}
   ]',
   '[
     {"name": "David Miller", "role": "Tech Enthusiast", "company": "EV World", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "The most incredible driving experience. Pure electric luxury!", "rating": 5}
   ]',
   '{
     "email": "sales@tesla.com",
     "phone": "+1 (888) 518-3752",
     "address": "Tesla Stores Worldwide",
     "social": {
       "twitter": "https://twitter.com/tesla",
       "instagram": "https://instagram.com/tesla"
     }
   }',
   false);

-- Grant necessary permissions
GRANT ALL ON public.landings TO authenticated;
GRANT SELECT ON public.landings TO anon;