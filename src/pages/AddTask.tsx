import { useState } from "react";
import { useAnalyzeText, useAnalyzePDF } from "@/hooks/useAnalyze";
import { toast } from "sonner";

export default function AddTask() {
  const [text, setText] = useState("");
  const analyzeText = useAnalyzeText();
  const analyzePDF = useAnalyzePDF();

  const handleTextAnalyze = async () => {
    try {
      const res = await analyzeText.mutateAsync(text);
      console.log(res); // next step: map to UI cards
      toast.success("Deadlines extracted");
    } catch {
      toast.error("Failed to analyze text");
    }
  };

  const handlePDFUpload = async (file: File) => {
    try {
      const res = await analyzePDF.mutateAsync(file);
      console.log(res);
      toast.success("PDF analyzed");
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
