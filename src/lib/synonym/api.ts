import { ApiResponse, SynonymListResponse } from "@/shared/types/api-response";
import { CreateSynonymDto, DeleteSynonymDto, PutSynonymDto } from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getSynonymList(
  params: { q?: string; page?: number; size?: number } = {}
): Promise<ApiResponse<SynonymListResponse>> {
  const queryParams = new URLSearchParams();

  if (params.q) queryParams.append("q", params.q);
  if (params.page) queryParams.append("page", params.page.toString());
  const size = params.size && params.size > 0 ? params.size : 10;
  queryParams.append("size", size.toString());
  queryParams.append("fieldName", "srchSynKeyword");

  return fetchAPI<ApiResponse<SynonymListResponse>>(
    "/synonyms?" + queryParams.toString(),
    {
      method: "GET",
    }
  );
}

export async function createSynonym(
  createSynonymDto: CreateSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/synonym", {
    method: "POST",
    body: createSynonymDto,
  });
}

export async function putSynonym(
  putSynonymDto: PutSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("/synonym", {
    method: "PUT",
    body: putSynonymDto,
  });
}

export async function deleteSynonym(
  deleteSynonymDto: DeleteSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(
    `/synonym/${deleteSynonymDto.srchSynId}`,
    {
      method: "DELETE",
    }
  );
}
