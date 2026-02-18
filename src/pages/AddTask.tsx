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
import { analyzeText, analyzePDF } from "@/lib/api";

export default function AddTask() {
  const { addDeadlines } = useDeadlines();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [detected, setDetected] = useState<any[]>([]);

  async function analyze() {
    if (!text.trim() && !file) return;

    setLoading(true);
    setDetected([]);

    try {
      const data = file
        ? await analyzePDF(file)
        : await analyzeText(text);

      const items = data.items ?? [];
      setDetected(items);

      if (items.length === 0) {
        toast("No deadlines found.", "info");
      }
    } catch {
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
    toast(`${detected.length} deadline(s) added.`, "success");
    navigate("/");
  }

  const canAnalyze = !loading && (file || text.trim());

  return (
    <div className="min-h-screen bg-app pb-28">
      <div className="sticky top-0 z-20 px-4 pt-10 pb-4 border-b border-base bg-app">
        <span className="text-xs font-mono text-accent">DEADLINEPAL</span>
        <h1 className="text-xl font-semibold text-primary mt-1">
          Extract Deadlines
        </h1>
        <p className="text-xs text-secondary mt-1">
          Paste text or upload a PDF. AI extracts deadlines automatically.
        </p>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* TEXT */}
        <div className="card">
          <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-base">
            <Type size={12} className="text-muted" />
            <span className="text-xs uppercase text-muted">Paste Text</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFile(null);
            }}
            rows={6}
            placeholder="Paste email, message, notice..."
            className="w-full resize-none bg-transparent text-sm text-primary placeholder:text-muted px-3.5 py-3 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-mono text-muted">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* FILE */}
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setText("");
            }}
          />

          <div className="card border-dashed">
            {file ? (
              <div className="flex items-center gap-3 px-3.5 py-3">
                <FileText size={16} className="text-accent" />
                <div className="flex-1 truncate">
                  <p className="text-sm text-primary truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                  }}
                >
                  <X size={14} className="text-muted" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-7 gap-2">
                <Upload size={18} className="text-muted" />
                <p className="text-sm text-secondary">
                  Upload PDF document
                </p>
              </div>
            )}
          </div>
        </label>

        <button
          onClick={analyze}
          disabled={!canAnalyze}
          className="w-full rounded-xl py-3.5 font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
          style={{ background: "rgb(var(--accent))" }}
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Extract Deadlines
            </>
          )}
        </button>

        {detected.length > 0 && (
          <div className="card animate-slide-up">
            <div className="px-3.5 py-2.5 border-b border-base flex items-center gap-2">
              <CheckCircle2 size={14} className="text-success" />
              <span className="text-xs uppercase text-secondary">
                {detected.length} found
              </span>
            </div>

            <div className="divide-y border-base">
              {detected.map((d, i) => (
                <div key={i} className="px-3.5 py-2.5">
                  <p className="text-sm text-primary">{d.title}</p>
                  {d.due_date && (
                    <p className="text-xs font-mono text-muted">
                      {d.due_date}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3.5">
              <button
                onClick={save}
                className="w-full rounded-lg py-3 font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: "rgb(var(--accent))" }}
              >
                Save All
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
