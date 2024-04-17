import { deleteNoun, NOUN_KEY, updateNoun, UpdateNounDto } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateNoun = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, UpdateNounDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, UpdateNounDto>({
    mutationFn: updateNoun,
    ...options,
    onSuccess: (data, variables, context) => {
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
