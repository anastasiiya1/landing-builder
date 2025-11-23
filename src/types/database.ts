export interface Database {
  public: {
    Tables: {
      landings: {
        Row: {
          id: number;
          slug: string;
          title: string;
          button_text: string;
          hero_image: string;
          benefits: Array<{
            icon: string;
            title: string;
            description: string;
          }>;
          testimonials: Array<{
            name: string;
            role: string;
            company: string;
            image: string;
            content: string;
            rating: number;
          }>;
          contact: {
            email: string;
            phone: string;
            address: string;
            social: {
              twitter?: string;
              facebook?: string;
              linkedin?: string;
              instagram?: string;
            };
          };
          liquid_glass_enabled: boolean;
        };
        Insert: Omit<Database['public']['Tables']['landings']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['landings']['Insert']>;
      };
    };
  };
}

// Helper type for landing page data
export type LandingPage = Database['public']['Tables']['landings']['Row'];
