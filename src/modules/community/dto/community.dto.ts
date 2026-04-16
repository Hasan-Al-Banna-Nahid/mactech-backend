import { z } from 'zod';

export const CreatePostSchema = z.object({
  postContent: z.string().min(10, 'Post must be at least 10 characters long'),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
