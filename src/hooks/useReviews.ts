import { useMutation } from "@tanstack/react-query";
import { reviewService, type ReviewAnalysisRequest } from "../services/api";

export const useReviewAnalysis = () => {
  return useMutation({
    mutationFn: (data: ReviewAnalysisRequest) =>
      reviewService.analyzeReview(data),
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
