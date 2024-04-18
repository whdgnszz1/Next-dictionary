import { ApiResponse, NounListResponse } from "@/shared/types/api-response";
import { CreateNounDto, NounType, UpdateNounDto, DeleteNounDto } from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getNounList(
  params: { q?: string; page?: number; size?: number } = {}
): Promise<ApiResponse<NounListResponse>> {
  const queryParams = new URLSearchParams();

  if (params.q) queryParams.append("q", params.q);
  if (params.page) queryParams.append("page", params.page.toString());
  const size = params.size && params.size > 0 ? params.size : 10;
  queryParams.append("size", size.toString());

  return fetchAPI<ApiResponse<NounListResponse>>(
    "nouns?" + queryParams.toString(),
    {
      method: "GET",
    }
  );
}

export async function getNoun(nounId: number): Promise<ApiResponse<NounType>> {
  return fetchAPI<ApiResponse<NounType>>(`noun/${nounId}`, { method: "GET" });
}

export async function createNoun(
  createNounDto: CreateNounDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("noun", {
    method: "POST",
    body: createNounDto,
  });
}

export async function updateNoun(
  updateNounDto: UpdateNounDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`noun`, {
    method: "PUT",
    body: updateNounDto,
  });
}

export async function deleteNoun(
  deleteNounDto: DeleteNounDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`noun/${deleteNounDto.id}`, {
    method: "DELETE",
  });
}
