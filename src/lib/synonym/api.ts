import { ApiResponse } from "@/shared/types/api-response";
import {
  CreateSynonymDto,
  DeleteSynonymDto,
  SynonymType,
  UpdateSynonymDto,
} from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getSynonymList(): Promise<ApiResponse<SynonymType[]>> {
  return fetchAPI<ApiResponse<SynonymType[]>>("synonyms", { method: "GET" });
}

export async function getSynonym(
  nounId: number
): Promise<ApiResponse<SynonymType>> {
  return fetchAPI<ApiResponse<SynonymType>>(`synonym/${nounId}`, {
    method: "GET",
  });
}

export async function createSynonym(
  createSynonymDto: CreateSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("synonym", {
    method: "POST",
    body: createSynonymDto,
  });
}

export async function updateSynonym(
  updateSynonymDto: UpdateSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`synonym`, {
    method: "PUT",
    body: updateSynonymDto,
  });
}

export async function deleteSynonym(
  deleteSynonymDto: DeleteSynonymDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`synonym/${deleteSynonymDto.id}`, {
    method: "DELETE",
  });
}
