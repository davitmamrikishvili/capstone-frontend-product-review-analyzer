import { useMutation } from "@tanstack/react-query";
import { reviewService, type ReviewAnalysisRequest, type ReviewAnalysisResponse } from "../services/api";

export function useReviewAnalysis({ onSuccess }: { onSuccess: (data: ReviewAnalysisResponse) => void; }) {
  return useMutation<ReviewAnalysisResponse, Error, ReviewAnalysisRequest>({
    mutationFn: reviewService.analyzeReview,
    onSuccess,
  });
};

export const useReviewScraping = () => {
  return useMutation({
    mutationFn: ({
      url,
      count,
      order,
    }: {
      url: string;
      count: number;
      order: string;
    }) => reviewService.scrapeReviews(url, count, order),
  });
};

export const useReviewSummarization = () => {
  return useMutation({
    mutationFn: (reviews: string[]) => reviewService.summarizeReviews(reviews),
  });
};
