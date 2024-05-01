import { fetchElasticsearch } from "@/shared/api/fetchElasticSearch";
import { AnalyzeAPIResponse } from "@/shared/types/analyze-api-response";

import { AnalyzeKeywordDto } from "./types";

export async function analyzeKeyword(
  analyzeKeywordDto: AnalyzeKeywordDto
): Promise<AnalyzeAPIResponse> {
  return await fetchElasticsearch<AnalyzeAPIResponse>("/nori_index/_analyze", {
    method: "POST",
    body: analyzeKeywordDto,
  });
}
