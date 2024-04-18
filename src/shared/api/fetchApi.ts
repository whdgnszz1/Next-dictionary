import { CreateNounDto, UpdateNounDto } from "@/lib/noun";

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: CreateNounDto | UpdateNounDto | null;
}

export async function fetchAPI<T>(
  url: string,
  options: FetchAPIOptions
): Promise<T> {
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
