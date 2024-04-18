import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateSynonymDto, SYNONYM_KEY, createSynonym } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const useCreateSynonym = (
  options: MutationOptions<ApiResponse<any>, ApiError, CreateSynonymDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, CreateSynonymDto>({
    ...options,
    mutationFn: createSynonym,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
