import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSynonymList, SYNONYM_KEY, SynonymType } from "..";
import { ApiResponse, SynonymListResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetSynonymList = (
  params: { q?: string; page?: number; size?: number } = {},
  options?: UseQueryOptions<ApiResponse<SynonymListResponse>, ApiError>
) => {
  return useQuery<ApiResponse<SynonymListResponse>, ApiError>({
    queryKey: [SYNONYM_KEY, params],
    queryFn: () => getSynonymList(params),
    ...options,
  });
};
