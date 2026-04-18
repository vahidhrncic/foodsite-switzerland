import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface LastUpdatedProps {
  date?: Date | null;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function LastUpdated({ date, onRefresh, isLoading }: LastUpdatedProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {date && (
        <span>
          Aktualisiert: {format(date, "PPp", { locale: de })}
        </span>
      )}
      {onRefresh && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label="Daten aktualisieren"
        >
          <RefreshCcw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      )}
    </div>
  );
}
