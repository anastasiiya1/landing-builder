import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    // Update any landing pages that have empty hero_image
    const { data, error } = await supabase
      .from('landings')
      .update({ 
        hero_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
      })
      .eq('hero_image', '')
      .select();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to update images', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Successfully updated hero images',
      updated_count: data?.length || 0,
      data
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Unexpected error occurred', error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all landing pages with their image status
    const { data, error } = await supabase
      .from('landings')
      .select('slug, title, hero_image')
      .order('slug');

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch images', error: error.message },
        { status: 500 }
      );
    }

    const imageStatus = data?.map(landing => ({
      slug: landing.slug,
      title: landing.title,
      has_image: !!(landing.hero_image && landing.hero_image.trim() !== ''),
      hero_image: landing.hero_image
    }));

    return NextResponse.json({
      message: 'Image status retrieved',
      data: imageStatus
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Unexpected error occurred', error: String(error) },
      { status: 500 }
    );
  }
}