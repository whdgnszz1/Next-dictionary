import { PutSrchUserKywrDto, SRCH_USER_KYWR_KEY, deleteSrchUserKywr } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteSrchUserKywr = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, PutSrchUserKywrDto>
) => {
  const client = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, PutSrchUserKywrDto>({
    mutationFn: deleteSrchUserKywr,
    onSuccess: (data, variable, ctx) => {
      toast.success("사용자 단어가 성공적으로 삭제되었습니다.");
      client.invalidateQueries({ queryKey: [SRCH_USER_KYWR_KEY] });
      options?.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(
        `사용자 단어 삭제 중 오류가 발생했습니다. \n${error.message}`
      );
      console.error("Error deleting UserKywr:", error);
    },
    ...options,
  });
};
