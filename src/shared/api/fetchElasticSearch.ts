interface ElasticsearchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

export async function fetchElasticsearch<T>(
  endpoint: string,
  options: ElasticsearchAPIOptions
): Promise<T> {
  const { method, body } = options;

  const headers = { "Content-Type": "application/json" };

  const config: RequestInit = {
    method: method,
    headers: headers,
    body: JSON.stringify(body),
  };

  const elasticsearchURL = process.env.NEXT_PUBLIC_ELASTICSEARCH_BASE_URL;

  try {
    const response = await fetch(`${elasticsearchURL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error with ${method} request to Elasticsearch:`, error);
    throw error;
  }
}
