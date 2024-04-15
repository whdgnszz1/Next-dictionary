import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNoun, NOUN_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import { NounType } from "@/lib/noun/types";

export const useGetNoun = (
  nounId: number,
  options?: UseQueryOptions<ApiResponse<NounType>, ApiError>
) => {
  return useQuery<ApiResponse<NounType>, ApiError>({
    queryKey: [NOUN_KEY, nounId],
    queryFn: () => getNoun(nounId),
    ...options,
  });
};
