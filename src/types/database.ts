export interface Database {
  public: {
    Tables: {
      landing_pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string;
          description: string;
          hero_image: string;
          hero_video?: string;
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
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['landing_pages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['landing_pages']['Insert']>;
      };
    };
  };
}
