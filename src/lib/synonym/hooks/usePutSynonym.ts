import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { PutSynonymDto, SYNONYM_KEY, putSynonym } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const usePutSynonym = (
  options: MutationOptions<ApiResponse<any>, ApiError, PutSynonymDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, PutSynonymDto>({
    ...options,
    mutationFn: putSynonym,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
