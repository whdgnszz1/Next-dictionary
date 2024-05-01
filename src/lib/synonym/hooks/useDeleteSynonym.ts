import { deleteSynonym, DeleteSynonymDto, SYNONYM_KEY } from "..";
import { ApiResponse } from "@/shared/types/api-response";
import { ApiError } from "@/shared/types/api-error";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteSynonym = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, DeleteSynonymDto>
) => {
  const client = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, DeleteSynonymDto>({
    mutationFn: deleteSynonym,
    onSuccess: (data, variable, ctx) => {
      toast.success("유의어 사전이 성공적으로 삭제되었습니다.");
      client.invalidateQueries({ queryKey: [SYNONYM_KEY] });
      options?.onSuccess?.(data, variable, ctx);
    },
    onError: (error) => {
      toast.error(
        `유의어 사전 삭제 중 오류가 발생했습니다. \n${error.message}`
      );
      console.error("Error deleting Synonym:", error);
    },
    ...options,
  });
};
