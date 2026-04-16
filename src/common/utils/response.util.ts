// src/common/utils/response.util.ts
export const CreateResponse = (
  success: boolean,
  message: string,
  data?: any,
  error?: any,
) => {
  return {
    success,
    message,
    meta: data?.meta || undefined,
    data: data?.result || data || null,
    error: error || null,
  };
};
