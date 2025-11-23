import { supabase } from './client';
import type { LandingPage } from '@/types/landing';

export async function getLanding(slug: string): Promise<LandingPage | null> {
  try {
    const { data, error } = await supabase
      .from('landing_pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching landing page:', error);
      return null;
    }

    return data as LandingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}
