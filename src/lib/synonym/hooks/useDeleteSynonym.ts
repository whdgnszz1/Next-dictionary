import { deleteSynonym, DeleteSynonymDto, SYNONYM_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteSynonym = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, DeleteSynonymDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, DeleteSynonymDto>({
    mutationFn: deleteSynonym,
    ...options,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
