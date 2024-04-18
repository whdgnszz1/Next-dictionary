import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateStopDto, STOP_KEY, createStop } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const useCreateStop = (
  options: MutationOptions<ApiResponse<any>, ApiError, CreateStopDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, CreateStopDto>({
    ...options,
    mutationFn: createStop,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [STOP_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
