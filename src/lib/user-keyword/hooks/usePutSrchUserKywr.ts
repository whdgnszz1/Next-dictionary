import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { ApiResponse } from "@/shared/types/api-response";
import toast from "react-hot-toast";
import { PutSrchUserKywrDto, putSrchUserKywr } from "..";

export const usePutSrchUserKywr = (
  options: MutationOptions<ApiResponse<any>, ApiError, PutSrchUserKywrDto> = {}
) => {
  return useMutation<ApiResponse<any>, ApiError, PutSrchUserKywrDto>({
    mutationFn: putSrchUserKywr,
    ...options,
  });
};
