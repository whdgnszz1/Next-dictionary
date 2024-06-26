import { CreateSrchUserKywrDto, PutSrchUserKywrDto } from "@/lib/user-keyword";
import { CreateSrchSynmKywrDto } from "@/lib/synm-keyword";
import { ApiResponse } from "../types/api-response";

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?:
    | CreateSrchUserKywrDto
    | CreateSrchSynmKywrDto
    | PutSrchUserKywrDto
    | FormData
    | null;
}

interface RequestHeaders {
  "Content-Type"?: string;
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function isAdditionalInfoStringOnly(info: any): boolean {
  return Object.values(info).every(isString);
}

export async function fetchAPI<T>(
  url: string,
  options: FetchAPIOptions
): Promise<ApiResponse<T>> {
  const { method, body } = options;

  const headers: RequestHeaders = {
    "Content-Type": body instanceof FormData ? undefined : "application/json",
  };

  const filteredHeaders: Record<string, string> = Object.entries(
    headers
  ).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  const config: RequestInit = {
    method: method,
    credentials: "include",
    headers: filteredHeaders,
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`/schm/api/v1/dic${url}`, config);

    if (response.ok) {
      return (await response.json()) as ApiResponse<T>;
    } else {
      const errorData = await response.json();
      const errorMessage = errorData?.detailMessage || "Unknown error occurred";
      console.error(`Error with ${method} request: ${errorMessage}`, errorData);

      const error = new Error(errorMessage) as any;

      if (errorData?.additionalInfo) {
        if (isAdditionalInfoStringOnly(errorData.additionalInfo)) {
          error.failedSrchUserKywr = errorData.additionalInfo;
        } else {
          error.failedSrchSynmKywr = errorData.additionalInfo;
        }
      }

      throw error;
    }
  } catch (error) {
    console.error(`Error with ${method} request:`, error);
    throw error;
  }
}
