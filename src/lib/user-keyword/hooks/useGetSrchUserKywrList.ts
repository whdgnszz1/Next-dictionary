import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getSrchUserKywrList, SRCH_USER_KYWR_KEY } from "..";
import { ApiResponse, UserKywrListResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import toast from "react-hot-toast";

export const useGetSrchUserKywrList = (
  params: {
    q?: string;
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
  } = {},
  options?: UseQueryOptions<ApiResponse<UserKywrListResponse>, ApiError>
) => {
  const queryOptions: UseQueryOptions<
    ApiResponse<UserKywrListResponse>,
    ApiError
  > = {
    queryKey: [SRCH_USER_KYWR_KEY, params],
    queryFn: () => getSrchUserKywrList(params),
    ...options,
  };

  const result = useQuery<ApiResponse<UserKywrListResponse>, ApiError>(
    queryOptions
  );

  if (result.isError) {
    const error = result.error as ApiError;
    toast.error(
      `사용자 사전 목록을 가져오는 도중 오류가 발생했습니다. \n 서버가 켜져있지 않습니다.`
    );
    console.error(
      "사용자 사전 목록을 가져오는 도중 오류가 발생했습니다.",
      error
    );
  }

  return result;
};
