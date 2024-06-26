import { ApiResponse, UserKywrListResponse } from "@/shared/types/api-response";
import { fetchAPI } from "@/shared/api/fetchApi";
import {
  BulkUploadSrchUserKywr,
  CreateSrchUserKywrDto,
  PutSrchUserKywrDto,
} from ".";

export async function getSrchUserKywrList(
  params: {
    q?: string;
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
  } = {}
): Promise<ApiResponse<UserKywrListResponse>> {
  const queryParams = new URLSearchParams();

  if (params.q) queryParams.append("q", params.q);
  if (params.page) queryParams.append("page", params.page.toString());
  const size = params.size && params.size > 0 ? params.size : 10;
  queryParams.append("size", size.toString());
  queryParams.append("sort", params.sort?.toString() ?? "amndDttm");
  queryParams.append("order", params.order?.toString() ?? "decend");
  queryParams.append("fieldName", "srchUserKywr");

  return fetchAPI<UserKywrListResponse>(
    "/user-keywords?" + queryParams.toString(),
    {
      method: "GET",
    }
  );
}

export async function createSrchUserKywr(
  createSrchUserKywrDto: CreateSrchUserKywrDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/user-keyword", {
    method: "POST",
    body: createSrchUserKywrDto,
  });
}

export async function bulkUploadSrchUserKywr(
  formData: BulkUploadSrchUserKywr
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/bulk-user-keyword", {
    method: "POST",
    body: formData,
  });
}

export async function putSrchUserKywr(
  putSrchUserKywrDto: PutSrchUserKywrDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/user-keyword", {
    method: "PUT",
    body: putSrchUserKywrDto,
  });
}

export async function deleteSrchUserKywr(
  deleteSrchUserKywrDto: PutSrchUserKywrDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`/delete-user-keyword`, {
    method: "PUT",
    body: deleteSrchUserKywrDto,
  });
}
