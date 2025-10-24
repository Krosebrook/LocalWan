export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<Omit<User, "id">>;
      };
      credits: {
        Row: Credit;
        Insert: Omit<Credit, "id" | "created_at">;
        Update: Partial<Omit<Credit, "id">>;
      };
      generations: {
        Row: Generation;
        Insert: Omit<Generation, "id" | "created_at">;
        Update: Partial<Omit<Generation, "id">>;
      };
      prompt_templates: {
        Row: PromptTemplate;
        Insert: Omit<PromptTemplate, "id" | "created_at">;
        Update: Partial<Omit<PromptTemplate, "id">>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      generation_type: "text_to_video" | "image_to_video";
      generation_status: "pending" | "processing" | "completed" | "failed";
    };
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Credit {
  id: string;
  user_id: string;
  amount: number;
  transaction_type: "purchase" | "usage" | "refund";
  description?: string;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  type: "text_to_video" | "image_to_video";
  prompt: string;
  status: "pending" | "processing" | "completed" | "failed";
  video_url?: string;
  thumbnail_url?: string;
  metadata?: Record<string, unknown>;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  template: string;
  variables?: string[];
  is_public: boolean;
  user_id?: string;
  usage_count: number;
  created_at: string;
}
