import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getStop, STOP_KEY, StopType } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import { NounType } from "@/lib/noun/types";

export const useGetStop = (
  stopId: number,
  options?: UseQueryOptions<ApiResponse<StopType>, ApiError>
) => {
  return useQuery<ApiResponse<NounType>, ApiError>({
    queryKey: [STOP_KEY, stopId],
    queryFn: () => getStop(stopId),
    ...options,
  });
};
