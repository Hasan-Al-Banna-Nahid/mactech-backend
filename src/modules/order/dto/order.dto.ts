import { z } from 'zod';

export const CreateOrderSchema = z.object({
  produceId: z.string().uuid('Invalid produce ID'),
  quantity: z.number().int().positive('Quantity must be at least 1'),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
