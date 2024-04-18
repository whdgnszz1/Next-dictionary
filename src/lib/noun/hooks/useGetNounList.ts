import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNounList, NOUN_KEY, NounType } from "..";
import { ApiResponse, NounListResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetNounList = (
  params: { q?: string; page?: number; size?: number } = {},
  options?: UseQueryOptions<ApiResponse<NounListResponse>, ApiError>
) => {
  return useQuery<ApiResponse<NounListResponse>, ApiError>({
    queryKey: [NOUN_KEY, params],
    queryFn: () => getNounList(params),
    ...options,
  });
};
