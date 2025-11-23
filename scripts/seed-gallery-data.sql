-- Sample landing pages for the gallery
-- Run this in your Supabase SQL editor to populate the database

-- Insert sample landing pages
INSERT INTO landings (
  id,
  slug,
  title,
  button_text,
  hero_image,
  benefits,
  testimonials,
  contact
) VALUES 

-- Marketing Agency Landing
(
  'marketing-agency-v2',
  'marketing-agency-v2',
  'Transform Your Marketing Strategy',
  'Get Free Consultation',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '[
    {"icon": "📈", "title": "Data-Driven Results", "description": "We use advanced analytics to optimize every campaign for maximum ROI and business growth."},
    {"icon": "🎯", "title": "Targeted Campaigns", "description": "Reach your ideal customers with precision-targeted advertising across all major platforms."},
    {"icon": "💡", "title": "Creative Excellence", "description": "Award-winning creative team that delivers compelling content that converts visitors to customers."},
    {"icon": "🚀", "title": "Rapid Growth", "description": "Scale your business faster with proven strategies that have generated millions in revenue."}
  ]',
  '[
    {"name": "Sarah Johnson", "role": "CEO", "company": "TechStart", "image": "https://images.unsplash.com/photo-1494790108755-2616b612b693?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Their marketing strategy increased our leads by 300% in just 3 months. Incredible results!", "rating": 5},
    {"name": "Michael Chen", "role": "Founder", "company": "GreenTech", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Professional team with outstanding expertise. They transformed our digital presence completely.", "rating": 5}
  ]',
  '{"email": "hello@marketingpro.com", "phone": "+1 (555) 123-4567", "address": "123 Marketing Ave, Business City, BC 12345"}'
),

-- SaaS Platform Landing
(
  'saas-platform-pro',
  'saas-platform-pro', 
  'Streamline Your Workflow Today',
  'Start Free Trial',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '[
    {"icon": "⚡", "title": "Lightning Fast", "description": "Process data 10x faster with our optimized cloud infrastructure and cutting-edge technology."},
    {"icon": "🔐", "title": "Enterprise Security", "description": "Bank-level security with end-to-end encryption, SOC2 compliance, and regular security audits."},
    {"icon": "📊", "title": "Advanced Analytics", "description": "Make data-driven decisions with real-time insights and customizable reporting dashboards."},
    {"icon": "🤝", "title": "Seamless Integration", "description": "Connect with 100+ tools and services through our robust API and pre-built integrations."}
  ]',
  '[
    {"name": "David Kim", "role": "CTO", "company": "DataFlow", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "This platform revolutionized how we handle data processing. Saved us 20 hours per week!", "rating": 5},
    {"name": "Lisa Rodriguez", "role": "Operations Manager", "company": "AutoScale", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Excellent customer support and the most intuitive interface we have ever used.", "rating": 5}
  ]',
  '{"email": "support@saaspro.com", "phone": "+1 (555) 987-6543", "address": "456 Tech Boulevard, Innovation District, ID 67890"}'
),

-- E-commerce Store Landing
(
  'ecommerce-boost',
  'ecommerce-boost',
  'Boost Your Online Sales',
  'Increase Revenue Now', 
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '[
    {"icon": "💰", "title": "Increase Revenue", "description": "Proven strategies that have helped our clients increase online sales by an average of 150%."},
    {"icon": "🛒", "title": "Optimize Conversions", "description": "Turn more visitors into customers with our conversion rate optimization expertise."},
    {"icon": "📱", "title": "Mobile-First Design", "description": "Responsive designs that provide exceptional shopping experiences on all devices."},
    {"icon": "🔄", "title": "Automated Marketing", "description": "Set up automated email campaigns and retargeting that work 24/7 to drive sales."}
  ]',
  '[
    {"name": "Jennifer Wu", "role": "Store Owner", "company": "Fashion Forward", "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "My online store revenue doubled within 6 months of implementing their recommendations!", "rating": 5},
    {"name": "Robert Martinez", "role": "E-commerce Manager", "company": "TechGadgets", "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Outstanding results! Our conversion rate improved by 85% and customer satisfaction soared.", "rating": 5}
  ]',
  '{"email": "sales@ecommerceboost.com", "phone": "+1 (555) 456-7890", "address": "789 Commerce Street, Retail Hub, RH 13579"}'
),

-- Real Estate Landing
(
  'real-estate-pro',
  'real-estate-pro',
  'Find Your Dream Home',
  'Browse Properties',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  '[
    {"icon": "🏠", "title": "Premium Properties", "description": "Exclusive access to the finest homes and commercial properties in prime locations."},
    {"icon": "💎", "title": "Expert Guidance", "description": "Professional real estate advisors with decades of experience in the local market."},
    {"icon": "⚡", "title": "Fast Transactions", "description": "Streamlined process that gets you from offer to closing in record time."},
    {"icon": "📈", "title": "Market Insights", "description": "Stay ahead with real-time market data and investment opportunity analysis."}
  ]',
  '[
    {"name": "Amanda Thompson", "role": "Home Buyer", "company": "Thompson Family", "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "They helped us find our perfect home in just 2 weeks! Exceptional service and expertise.", "rating": 5},
    {"name": "James Wilson", "role": "Property Investor", "company": "Wilson Investments", "image": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80", "content": "Their market knowledge is unmatched. Made profitable investments thanks to their insights.", "rating": 5}
  ]',
  '{"email": "info@realestateprp.com", "phone": "+1 (555) 234-5678", "address": "321 Property Lane, Real Estate District, RE 24680"}'
);

-- Update created_at timestamps to show variety
UPDATE landings SET created_at = NOW() - INTERVAL '30 days' WHERE slug = 'marketing-agency-v2';
UPDATE landings SET created_at = NOW() - INTERVAL '15 days' WHERE slug = 'saas-platform-pro';
UPDATE landings SET created_at = NOW() - INTERVAL '7 days' WHERE slug = 'ecommerce-boost';
UPDATE landings SET created_at = NOW() - INTERVAL '2 days' WHERE slug = 'real-estate-pro';