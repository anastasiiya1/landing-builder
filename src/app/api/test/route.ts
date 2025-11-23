import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('landings')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { message: 'Database connection failed', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Database connection successful',
      timestamp: new Date().toISOString(),
      dataCount: data?.length || 0
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { message: 'Unexpected error occurred', error: String(error) },
      { status: 500 }
    );
  }
}
