import { ApiResponse, NounListResponse } from "@/shared/types/api-response";
import { CreateNounDto, NounType, DeleteNounDto } from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getNounList(
  params: { q?: string; page?: number; size?: number } = {}
): Promise<ApiResponse<NounListResponse>> {
  const queryParams = new URLSearchParams();

  if (params.q) queryParams.append("q", params.q);
  if (params.page) queryParams.append("page", params.page.toString());
  const size = params.size && params.size > 0 ? params.size : 10;
  queryParams.append("size", size.toString());
  queryParams.append("fieldName", "term");

  return fetchAPI<ApiResponse<NounListResponse>>(
    "/nouns?" + queryParams.toString(),
    {
      method: "GET",
    }
  );
}

export async function getNoun(
  srchNounId: number
): Promise<ApiResponse<NounType>> {
  return fetchAPI<ApiResponse<NounType>>(`/noun/${srchNounId}`, {
    method: "GET",
  });
}

export async function createNoun(
  createNounDto: CreateNounDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/noun", {
    method: "POST",
    body: createNounDto,
  });
}

export async function deleteNoun(
  deleteNounDto: DeleteNounDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`/noun/${deleteNounDto.srchNounId}`, {
    method: "DELETE",
  });
}
