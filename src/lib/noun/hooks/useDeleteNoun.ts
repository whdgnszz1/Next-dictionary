import { deleteNoun, NOUN_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteNoun = (
  nounId: number,
  options?: UseMutationOptions<ApiResponse<any>, ApiError, number>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, number>({
    mutationFn: () => deleteNoun(nounId),
    ...options,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
