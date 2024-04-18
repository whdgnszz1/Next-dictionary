import { deleteStop, DeleteStopDto, STOP_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteStop = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, DeleteStopDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, DeleteStopDto>({
    mutationFn: deleteStop,
    ...options,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [STOP_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
