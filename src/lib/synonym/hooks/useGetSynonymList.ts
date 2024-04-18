import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSynonymList, SYNONYM_KEY, SynonymType } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetSynonymList = (
  options?: UseQueryOptions<ApiResponse<SynonymType[]>, ApiError>
) => {
  return useQuery<ApiResponse<SynonymType[]>, ApiError>({
    queryKey: [SYNONYM_KEY],
    queryFn: getSynonymList,
    ...options,
  });
};
