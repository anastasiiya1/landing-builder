import { supabase } from './client';
import type { LandingPage } from '@/types/database';

export async function getLanding(slug: string): Promise<LandingPage | null> {
  try {
    const { data, error } = await supabase
      .from('landings')
      .select('*')
      .eq('slug', slug)
      .limit(1);

    if (error) {
      console.error('Error fetching landing page:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as LandingPage;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
}
