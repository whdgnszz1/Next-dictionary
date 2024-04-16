import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateNounDto, NOUN_KEY, createNoun } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const useCreateNoun = (
  options: MutationOptions<ApiResponse<any>, ApiError, CreateNounDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, CreateNounDto>({
    ...options,
    mutationFn: createNoun,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
