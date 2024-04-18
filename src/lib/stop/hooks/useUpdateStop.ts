import { STOP_KEY, updateStop, UpdateStopDto } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateStop = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, UpdateStopDto>
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, UpdateStopDto>({
    mutationFn: updateStop,
    ...options,
    onSuccess: (data, variables, context) => {
      client.invalidateQueries({ queryKey: [STOP_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
