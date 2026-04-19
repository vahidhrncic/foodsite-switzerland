import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "flat";
  accentColor?: "green" | "red" | "blue" | "amber";
}

const accentBorder = {
  green: "border-t-2 border-t-forest-500",
  red:   "border-t-2 border-t-swiss-500",
  blue:  "border-t-2 border-t-blue-500",
  amber: "border-t-2 border-t-amber-500",
} as const;

const trendConfig = {
  up:   { icon: TrendingUp,   className: "text-forest-600 dark:text-forest-400", label: "steigend" },
  down: { icon: TrendingDown, className: "text-swiss-600  dark:text-swiss-400",  label: "sinkend" },
  flat: { icon: Minus,        className: "text-muted-foreground",                label: "stabil" },
} as const;

export function MetricsCard({ title, value, icon, description, trend, accentColor }: MetricsCardProps) {
  const TrendIcon = trend ? trendConfig[trend].icon : null;

  return (
    <div
      className={cn(
        "group relative rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-border",
        accentColor ? accentBorder[accentColor] : "border-t-2 border-t-transparent",
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground leading-tight">
          {title}
        </p>
        <div className="shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          {icon}
        </div>
      </div>

      <div className="stat-number text-foreground">{value}</div>

      <div className="mt-2 flex items-center justify-between gap-2">
        {description && (
          <p className="text-[11px] text-muted-foreground truncate">{description}</p>
        )}
        {TrendIcon && trend && (
          <div className={cn("flex items-center gap-1 shrink-0", trendConfig[trend].className)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              {trendConfig[trend].label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
