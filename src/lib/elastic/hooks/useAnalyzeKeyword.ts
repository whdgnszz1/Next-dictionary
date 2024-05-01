import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";
import { AnalyzeKeywordDto, ELASTIC_KEY, analyzeKeyword } from "..";

export const useAnalyzeKeyword = (
  options: MutationOptions<AnalyzeAPIResponse, ApiError, AnalyzeKeywordDto> = {}
) => {
  const client = useQueryClient();
  return useMutation<AnalyzeAPIResponse, ApiError, AnalyzeKeywordDto>({
    mutationFn: analyzeKeyword,
    onSuccess: (data, variable, ctx) => {
      client.invalidateQueries({ queryKey: [ELASTIC_KEY] });
      options.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(`키워드 분석 중 오류가 발생했습니다. \n ${error.message}`);
      console.error("Failed to Analyze Keyword", error);
    },
    ...options,
  });
};
