import { MutationOptions, useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { BulkUploadSrchUserKywr, bulkUploadSrchUserKywr } from "..";
import { ApiResponse } from "@/shared/types/api-response";

export const useBulkUploadSrchUserKywr = (
  options: MutationOptions<
    ApiResponse<any>,
    ApiError,
    BulkUploadSrchUserKywr
  > = {}
) => {
  return useMutation<ApiResponse<any>, ApiError, BulkUploadSrchUserKywr>({
    ...options,
    mutationFn: bulkUploadSrchUserKywr,
  });
};
