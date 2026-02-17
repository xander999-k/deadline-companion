import { createContext, useContext, useState, ReactNode } from "react";

export type DeadlineItem = {
  title: string;
  due_date: string | null;
  amount: number | null;
  confidence: number;
};

type DeadlineContextType = {
  deadlines: DeadlineItem[];
  addDeadlines: (items: DeadlineItem[]) => void;
};

const DeadlineContext = createContext<DeadlineContextType | null>(null);

export function DeadlineProvider({ children }: { children: ReactNode }) {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);

  const addDeadlines = (items: DeadlineItem[]) => {
    setDeadlines((prev) => [...prev, ...items]);
  };

  return (
    <DeadlineContext.Provider value={{ deadlines, addDeadlines }}>
      {children}
    </DeadlineContext.Provider>
  );
}

export function useDeadlines() {
  const ctx = useContext(DeadlineContext);
  if (!ctx) throw new Error("useDeadlines must be used inside DeadlineProvider");
  return ctx;
}
