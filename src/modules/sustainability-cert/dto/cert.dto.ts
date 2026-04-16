import { z } from 'zod';

export const CreateCertSchema = z.object({
  certifyingAgency: z.string().min(3, 'Agency name is required'),
  certificationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format (YYYY-MM-DD)',
  }),
});

export type CreateCertDto = z.infer<typeof CreateCertSchema>;
