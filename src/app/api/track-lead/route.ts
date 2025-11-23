import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, landingPage, source } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { message: 'Either email or phone is required' },
        { status: 400 }
      );
    }
    
    const leadData = {
      email,
      phone,
      landingPage: landingPage || 'unknown',
      source: source || 'website',
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown'
    };

    console.log('New lead tracked:', leadData);

    return NextResponse.json({
      message: 'Lead tracked successfully',
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  } catch (error) {
    console.error('Lead tracking error:', error);
    return NextResponse.json(
      { message: 'Failed to track lead', error: String(error) },
      { status: 500 }
    );
  }
}
