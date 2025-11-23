import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    const sampleData = {
      slug: 'demo',
      title: 'Transform Your Business Today',
      meta_title: 'Transform Your Business Today | Landing Builder',
      meta_description: 'Experience the power of cutting-edge technology combined with innovative design.',
      content: {
        hero: {
          title: 'Transform Your Business Today',
          subtitle: 'The Ultimate Solution for Modern Enterprises',
          description: 'Experience the power of cutting-edge technology combined with innovative design.',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
        },
        benefits: [
          {
            icon: 'Fast',
            title: 'Lightning Fast',
            description: 'Experience blazing-fast performance that keeps your users engaged.'
          },
          {
            icon: 'Secure', 
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security ensures your data is protected.'
          },
          {
            icon: 'Results',
            title: 'Results Driven', 
            description: 'Data-driven insights help you make informed decisions.'
          }
        ],
        testimonials: [
          {
            name: 'Sarah Johnson',
            role: 'CEO',
            company: 'TechStart Inc',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550',
            content: 'This platform transformed our entire workflow. 300% increase in efficiency!',
            rating: 5
          }
        ],
        contact: {
          email: 'hello@landingbuilder.com',
          phone: '+1 (555) 123-4567', 
          address: '123 Innovation Drive, Tech City, TC 12345',
          social: {
            twitter: 'https://twitter.com/landingbuilder',
            linkedin: 'https://linkedin.com/company/landingbuilder'
          }
        }
      },
      is_published: true
    };

    const { data, error } = await supabase
      .from('landings')
      .insert([sampleData])
      .select();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to create sample data', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Sample landing page created successfully',
      data: data[0]
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Unexpected error occurred', error: String(error) },
      { status: 500 }
    );
  }
}
