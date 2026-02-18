import { useState } from "react";
import { useDeadlines } from "@/context/DeadlineContext";
import { useToast } from "@/components/Toast";
import {
  Sparkles,
  Upload,
  X,
  CheckCircle2,
  ArrowRight,
  FileText,
  Type,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export default function AddTask() {
  const { addDeadlines } = useDeadlines();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [detected, setDetected] = useState<any[]>([]);

  async function analyze() {
    setLoading(true);
    setDetected([]);

    try {
      let response: Response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        response = await fetch(`${API_BASE}/analyze-document`, {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch(`${API_BASE}/analyze-text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: text }),
        });
      }

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();
      const items = data.items || [];

      setDetected(items);

      if (items.length === 0) {
        toast("No deadlines found.", "info");
      }
    } catch (err) {
      toast("Failed to reach analysis server.", "error");
    } finally {
      setLoading(false);
    }
  }

  function save() {
    addDeadlines(detected);
    setDetected([]);
    setText("");
    setFile(null);
    toast("Deadlines added successfully.", "success");
    navigate("/");
  }

  const canAnalyze = !loading && (text.trim() || file);

  return (
    <div className="min-h-screen bg-app pb-28">
      {/* HEADER */}
      <div className="sticky top-0 z-20 px-4 pt-10 pb-4 border-b border-base">
        <h1 className="text-xl font-semibold text-primary">
          Extract Deadlines
        </h1>
        <p className="text-xs text-secondary">
          Paste text or upload a PDF — AI extracts deadlines.
        </p>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* TEXT INPUT */}
        <div className="card">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-base">
            <Type size={12} />
            <span className="text-xs font-semibold uppercase text-muted">
              Paste Text
            </span>
          </div>
          <textarea
            value={text}
            onChange={e => {
              setText(e.target.value);
              setFile(null);
            }}
            rows={6}
            placeholder="Paste message, email, notice..."
            className="w-full bg-transparent px-3 py-3 text-sm outline-none"
          />
        </div>

        {/* FILE UPLOAD */}
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={e => {
              setFile(e.target.files?.[0] ?? null);
              setText("");
            }}
          />
          <div className="card border-dashed">
            {file ? (
              <div className="flex items-center gap-3 p-3">
                <FileText size={16} />
                <span className="truncate">{file.name}</span>
                <button onClick={() => setFile(null)}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-muted">
                <Upload size={20} />
                <span className="text-sm">Upload PDF</span>
              </div>
            )}
          </div>
        </label>

        {/* ANALYZE */}
        <button
          onClick={analyze}
          disabled={!canAnalyze}
          className="btn-accent w-full py-3 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? "Analyzing..." : <>
            <Sparkles size={14} /> Extract Deadlines
          </>}
        </button>

        {/* RESULTS */}
        {detected.length > 0 && (
          <div className="card">
            <div className="px-3 py-2 border-b border-base">
              <span className="text-xs font-semibold uppercase text-secondary">
                {detected.length} deadlines found
              </span>
            </div>

            {detected.map((d, i) => (
              <div key={i} className="px-3 py-2 border-b border-base">
                <p className="text-sm font-medium">{d.title}</p>
                {d.due_date && (
                  <p className="text-xs text-muted">{d.due_date}</p>
                )}
              </div>
            ))}

            <button
              onClick={save}
              className="btn-accent w-full py-3 mt-2 rounded-xl flex items-center justify-center gap-2"
            >
              Save Deadlines <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
