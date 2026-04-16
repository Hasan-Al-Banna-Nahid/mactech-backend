import { z } from 'zod';

export const CreateRentalSpaceSchema = z.object({
  location: z.string().min(5, 'Location detail is required'),
  size: z.string().min(1, 'Size description is required'),
  price: z.number().positive('Price must be a positive number'),
});

export const UpdateRentalSpaceSchema = CreateRentalSpaceSchema.partial();

export type CreateRentalSpaceDto = z.infer<typeof CreateRentalSpaceSchema>;
export type UpdateRentalSpaceDto = z.infer<typeof UpdateRentalSpaceSchema>;
