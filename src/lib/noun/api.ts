import { ApiResponse } from "@/shared/types/api-response";
import { CreateNounDto, NounType, UpdateNounDto, DeleteNounDto } from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getNounList(): Promise<ApiResponse<NounType[]>> {
  return fetchAPI<ApiResponse<NounType[]>>("nouns", { method: "GET" });
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
