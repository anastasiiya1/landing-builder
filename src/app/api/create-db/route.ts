import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    // Sample landing page data
    const sampleData = {
      slug: 'demo',
      title: 'Transform Your Business Today',
      subtitle: 'The Ultimate Solution for Modern Enterprises',
      description: 'Experience the power of cutting-edge technology combined with innovative design. Our platform helps businesses scale efficiently while maintaining exceptional user experiences.',
      hero_image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      benefits: [
        {
          icon: 'âš¡',
          title: 'Lightning Fast',
          description: 'Experience blazing-fast performance that keeps your users engaged and your business moving forward.'
        },
        {
          icon: 'í´’',
          title: 'Secure & Reliable',
          description: 'Enterprise-grade security ensures your data is protected with industry-leading encryption and monitoring.'
        },
        {
          icon: 'í¾¯',
          title: 'Results Driven',
          description: 'Data-driven insights and analytics help you make informed decisions that drive real business growth.'
        }
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          role: 'CEO',
          company: 'TechStart Inc',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
          content: 'This platform transformed our entire workflow. The results speak for themselves - 300% increase in efficiency!',
          rating: 5
        },
        {
          name: 'Michael Chen',
          role: 'CTO',
          company: 'InnovateNow',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          content: 'Outstanding support and incredible features. It is exactly what we needed to scale our operations.',
          rating: 5
        }
      ],
      contact: {
        email: 'hello@landingbuilder.com',
        phone: '+1 (555) 123-4567',
        address: '123 Innovation Drive, Tech City, TC 12345',
        social: {
          twitter: 'https://twitter.com/landingbuilder',
          linkedin: 'https://linkedin.com/company/landingbuilder',
          instagram: 'https://instagram.com/landingbuilder'
        }
      }
    };

    const { data, error } = await supabase
      .from('landing_pages')
      .insert([sampleData])
      .select();

    if (error) {
      console.error('Database insert error:', error);
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
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Unexpected error occurred', error: String(error) },
      { status: 500 }
    );
  }
}
