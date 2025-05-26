import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ReviewAnalysisRequest {
  prompt: string;
  aspects: string[];
}

export interface ReviewAnalysisResponse {
  results: Array<{
    aspect: string;
    sentiment: {
      label: string;
      score: number;
    };
  }>;
}

export const reviewService = {
  async analyzeReview(
    data: ReviewAnalysisRequest
  ): Promise<ReviewAnalysisResponse> {
    const response = await api.post("/analyze", data);
    return response.data;
  },

  async scrapeReviews(url: string, count: number, order: string) {
    const response = await api.post("/scrape", { url, count, order });
    return response.data;
  },

  async summarizeReviews(reviews: string[]) {
    const response = await api.post("/summarize", { reviews });
    return response.data;
  },
};
