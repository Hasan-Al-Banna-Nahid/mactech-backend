import { z } from 'zod';

export const CreateVendorProfileSchema = z.object({
  farmName: z.string().min(3, 'Farm name is too short'),
  farmLocation: z.string().min(5, 'Location detail is required'),
});

export const UpdateVendorProfileSchema = CreateVendorProfileSchema.partial();

export type CreateVendorProfileDto = z.infer<typeof CreateVendorProfileSchema>;
export type UpdateVendorProfileDto = z.infer<typeof UpdateVendorProfileSchema>;
