import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSynonym, SYNONYM_KEY, SynonymType } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetSynonym = (
  synonymId: number,
  options?: UseQueryOptions<ApiResponse<SynonymType>, ApiError>
) => {
  return useQuery<ApiResponse<SynonymType>, ApiError>({
    queryKey: [SYNONYM_KEY, synonymId],
    queryFn: () => getSynonym(synonymId),
    ...options,
  });
};
