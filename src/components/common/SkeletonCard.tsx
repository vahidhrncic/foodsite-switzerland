import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  lines?: number;
  header?: boolean;
}

export function SkeletonCard({ lines = 3, header = true }: SkeletonCardProps) {
  return (
    <Card>
      {header && (
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}
