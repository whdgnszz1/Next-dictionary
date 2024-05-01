import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { PutSynonymDto, SYNONYM_KEY, putSynonym } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import toast from "react-hot-toast";

export const usePutSynonym = (
  options: MutationOptions<ApiResponse<any>, ApiError, PutSynonymDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<ApiResponse<any>, ApiError, PutSynonymDto>({
    mutationFn: putSynonym,
    onSuccess: (data, variable, ctx) => {
      toast.success("유의어가 성공적으로 수정됐습니다.");
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      options.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(`유의어 수정 중 오류가 발생했습니다. \n ${error.message}`);
      console.error("Failed to Update Synonym", error);
    },
    ...options,
  });
};
