import { ApiResponse } from "@/shared/types/api-response";
import { CreateNounDto, NounType, UpdateNounDto } from "./types";

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: CreateNounDto | UpdateNounDto | null;
}

async function fetchAPI<T>(url: string, options: FetchAPIOptions): Promise<T> {
  const { method, body } = options;
  const headers = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method: method,
    credentials: "include",
    headers: headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/${url}`,
      config
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
    throw error;
  }
}

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

export async function updateNoun(updateNounDto: UpdateNounDto): Promise<void> {
  await fetchAPI<void>("noun", { method: "PUT", body: updateNounDto });
}

export async function deleteNoun(nounId: number): Promise<ApiResponse<any>> {
  return await fetchAPI<ApiResponse<any>>(`noun/${nounId}`, {
    method: "DELETE",
  });
}
