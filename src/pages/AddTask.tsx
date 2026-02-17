import { useState } from "react";
import { useAnalyzeText, useAnalyzePDF } from "@/hooks/useAnalyze";
import { toast } from "sonner";
import { useDeadlines } from "@/context/DeadlineContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const analyzeText = useAnalyzeText();
  const analyzePDF = useAnalyzePDF();
  const { addDeadlines } = useDeadlines();

  const handleTextAnalyze = async () => {
    try {
      const res = await analyzeText.mutateAsync(text);
      addDeadlines(res.items);
      toast.success("Deadlines added to dashboard");
    } catch {
      toast.error("Failed to analyze text");
    }
  };

  const handlePDFUpload = async (file: File) => {
    try {
      const res = await analyzePDF.mutateAsync(file);
      addDeadlines(res.items);
      toast.success("Deadlines added to dashboard");
    } catch {
      toast.error("Failed to analyze PDF");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Paste message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleTextAnalyze}>Analyze Text</button>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => e.target.files && handlePDFUpload(e.target.files[0])}
      />
    </div>
  );
}
