import { SYNONYM_KEY, updateSynonym, UpdateSynonymDto } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateSynonym = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, UpdateSynonymDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, UpdateSynonymDto>({
    mutationFn: updateSynonym,
    ...options,
    onSuccess: (data, variables, context) => {
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
