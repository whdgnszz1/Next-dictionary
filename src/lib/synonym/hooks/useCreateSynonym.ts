import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateSynonymDto, SYNONYM_KEY, createSynonym } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import toast from "react-hot-toast";

export const useCreateSynonym = (
  options: MutationOptions<ApiResponse<any>, ApiError, CreateSynonymDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, CreateSynonymDto>({
    mutationFn: createSynonym,
    onSuccess: (data, variable, ctx) => {
      toast.success("유의어가 성공적으로 추가됐습니다.");
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      options.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(`유의어 추가 중 오류가 발생했습니다. \n ${error.message}`);
      console.error("Failed to Create Synonym", error);
    },
    ...options,
  });
};
