import { z } from 'zod';

export const CreateProduceSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  description: z.string().min(10, 'Description should be detailed'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(2, 'Category is required'),
  availableQuantity: z.number().int().nonnegative(),
});

export const UpdateProduceSchema = CreateProduceSchema.partial();

export type CreateProduceDto = z.infer<typeof CreateProduceSchema>;
export type UpdateProduceDto = z.infer<typeof UpdateProduceSchema>;
