import { CreateNounDto, NounType, UpdateNounDto } from "./types";

export async function getNounList(): Promise<NounType[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/nouns`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching nouns:", error);
    throw error;
  }
}

export async function getNoun(nounId: number): Promise<NounType> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/noun/${nounId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching noun:", error);
    throw error;
  }
}

export async function createNoun(createNounDto: CreateNounDto): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/noun`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createNounDto),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error creating noun:", error);
    throw error;
  }
}

export async function updateNoun(updateNounDto: UpdateNounDto): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/noun`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateNounDto),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error updating noun:", error);
    throw error;
  }
}

export async function deleteNoun(nounId: number): Promise<void> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/schdic/api/v1/dic/noun/${nounId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting noun:", error);
    throw error;
  }
}
