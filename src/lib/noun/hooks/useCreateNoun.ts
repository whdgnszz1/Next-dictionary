import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateNounDto, NOUN_KEY, createNoun } from "..";

export const useCreateNoun = (
  options: MutationOptions<void, ApiError, CreateNounDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<void, ApiError, CreateNounDto>({
    ...options,
    mutationFn: createNoun,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      if (options?.onSuccess instanceof Function)
        options.onSuccess(data, variable, ctx);
    },
  });
};
