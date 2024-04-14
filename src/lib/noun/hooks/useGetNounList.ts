import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getNounList, NOUN_KEY, NounType } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetNounList = (
  options?: UseQueryOptions<ApiResponse<NounType[]>, ApiError>
) => {
  return useQuery<ApiResponse<NounType[]>, ApiError>({
    queryKey: [NOUN_KEY],
    queryFn: getNounList,
    ...options,
  });
};
