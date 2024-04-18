import { ApiResponse } from "@/shared/types/api-response";
import { StopType, CreateStopDto, UpdateStopDto, DeleteStopDto } from "./types";
import { fetchAPI } from "@/shared/api/fetchApi";

export async function getStopList(): Promise<ApiResponse<StopType[]>> {
  return fetchAPI<ApiResponse<StopType[]>>("stops", { method: "GET" });
}

export async function getStop(nounId: number): Promise<ApiResponse<StopType>> {
  return fetchAPI<ApiResponse<StopType>>(`stop/${nounId}`, { method: "GET" });
}

export async function createStop(
  createStopDto: CreateStopDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>("stop", {
    method: "POST",
    body: createStopDto,
  });
}

export async function updateStop(
  updateStopDto: UpdateStopDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`stop`, {
    method: "PUT",
    body: updateStopDto,
  });
}

export async function deleteStop(
  deleteStopDto: DeleteStopDto
): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`stop/${deleteStopDto.id}`, {
    method: "DELETE",
  });
}
