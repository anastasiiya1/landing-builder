import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    const { data, error } = await supabase
      .from('landings')
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
