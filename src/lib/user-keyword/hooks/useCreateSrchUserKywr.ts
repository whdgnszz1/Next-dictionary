import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { CreateSrchUserKywrDto, createSrchUserKywr } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const useCreateSrchUserKywr = (
  options: MutationOptions<
    ApiResponse<any>,
    ApiError,
    CreateSrchUserKywrDto
  > = {}
) => {
  return useMutation<ApiResponse<any>, ApiError, CreateSrchUserKywrDto>({
    ...options,
    mutationFn: createSrchUserKywr,
  });
};
