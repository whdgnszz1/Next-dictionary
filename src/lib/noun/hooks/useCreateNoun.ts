import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateNounDto, NOUN_KEY, createNoun } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import toast from "react-hot-toast";

export const useCreateNoun = (
  options: MutationOptions<ApiResponse<any>, ApiError, CreateNounDto> = {}
) => {
  const client = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, CreateNounDto>({
    ...options,
    mutationFn: createNoun,
    onSuccess: (data, variable, ctx) => {
      toast.success("단어가 성공적으로 추가됐습니다.");
      client.invalidateQueries({ queryKey: [NOUN_KEY] });
      options.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(`단어 추가 중 오류가 발생했습니다. \n ${error.message}`);
      console.error("Failed to Create Noun", error);
    },
  });
};
