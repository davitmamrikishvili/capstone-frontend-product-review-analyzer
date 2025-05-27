import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface GeneralSentimentResult {
  review: string;
  label: string;
  score: number;
}

interface AspectSentimentResult {
  review: string;
  details: Array<{
    aspect: string;
    label: string;
    score: number;
  }>;
}

export interface ReviewAnalysisResponse {
  status: string;
  analysis_type: "general" | "aspect-based";
  aspects_analyzed?: string[];
  timestamp: string;
  summary?: string;
  results: Array<GeneralSentimentResult | AspectSentimentResult>;
}

export interface ReviewAnalysisRequest {
  reviews: string[];
  aspects?: string[];
}

export const reviewService = {
  async analyzeReview(
    data: ReviewAnalysisRequest
  ): Promise<ReviewAnalysisResponse> {
    const { reviews, aspects } = data;

    const params = new URLSearchParams();
    aspects?.forEach((aspect) => params.append("aspects", aspect));

    const response = await api.post(
      "/analyze/",
      { reviews },
      {
        params,
      }
    );
    const summary = await api.post("/summarize", { reviews });
    return {
      ...response.data,
      ...summary.data,
      timestamp: new Date().toISOString(),
    };
  },

  async scrapeReviews(url: string, count: number, order: string) {
    const params = new URLSearchParams();
    params.append("count", count.toString());
    params.append("order", order);
    const response = await api.post("/scrape", { url }, { params });
    return response.data;
  },
};
