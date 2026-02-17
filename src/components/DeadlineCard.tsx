import { humanDate, getDayDiff } from "@/lib/dateUtils";

export default function DeadlineCard({ item }: { item: any }) {
  let color = "bg-gray-200";

  if (item.due_date) {
    const diff = getDayDiff(item.due_date);
    if (diff < 0) color = "bg-red-500";
    else if (diff === 0) color = "bg-orange-500";
    else if (diff <= 7) color = "bg-yellow-400";
  }

  return (
    <div className="flex border rounded-lg bg-white overflow-hidden">
      <div className={`${color} w-1`} />

      <div className="p-4 flex-1">
        <h3 className="font-semibold">{item.title}</h3>

        <p className="text-sm text-gray-500">
          {humanDate(item.due_date)}
        </p>

        {item.amount && (
          <p className="font-medium mt-1">₹{item.amount}</p>
        )}
      </div>
    </div>
  );
}
