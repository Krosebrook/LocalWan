import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const creditSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  amount: z.number(),
  transaction_type: z.enum(["purchase", "usage", "refund"]),
  description: z.string().optional(),
  created_at: z.string(),
});

export const generationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.enum(["text_to_video", "image_to_video"]),
  prompt: z.string().min(1).max(2000),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  video_url: z.string().url().optional(),
  thumbnail_url: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
  credits_used: z.number().min(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export const promptTemplateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.string(),
  template: z.string().min(1).max(2000),
  variables: z.array(z.string()).optional(),
  is_public: z.boolean(),
  user_id: z.string().uuid().optional(),
  usage_count: z.number().default(0),
  created_at: z.string(),
});

// Input validation schemas
export const createGenerationSchema = z.object({
  type: z.enum(["text_to_video", "image_to_video"]),
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(2000, "Prompt too long"),
  image_url: z.string().url().optional(),
  settings: z.object({
    duration: z.number().min(1).max(10).default(5),
    fps: z.number().min(12).max(60).default(24),
    resolution: z.enum(["720p", "1080p"]).default("720p"),
  }).optional(),
});

export type CreateGenerationInput = z.infer<typeof createGenerationSchema>;
