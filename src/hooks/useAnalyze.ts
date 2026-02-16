import { useMutation } from "@tanstack/react-query";
import { analyzeText, analyzePDF } from "@/lib/api";

export function useAnalyzeText() {
  return useMutation({
    mutationFn: analyzeText,
  });
}

export function useAnalyzePDF() {
  return useMutation({
    mutationFn: analyzePDF,
  });
}
