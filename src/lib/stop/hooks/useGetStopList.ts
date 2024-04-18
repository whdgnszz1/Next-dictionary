import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getStopList, STOP_KEY, StopType } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";

export const useGetStopList = (
  options?: UseQueryOptions<ApiResponse<StopType[]>, ApiError>
) => {
  return useQuery<ApiResponse<StopType[]>, ApiError>({
    queryKey: [STOP_KEY],
    queryFn: getStopList,
    ...options,
  });
};
