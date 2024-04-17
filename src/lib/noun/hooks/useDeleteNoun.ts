import { deleteNoun, DeleteNounDto, NOUN_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteNoun = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, DeleteNounDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, DeleteNounDto>({
    mutationFn: deleteNoun,
    ...options,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
