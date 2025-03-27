
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  type?: 'table' | 'card' | 'form' | 'full';
  rows?: number;
}

export const LoadingState = ({ type = 'card', rows = 3 }: LoadingStateProps) => {
  if (type === 'full') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full space-y-4">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/2" />
        </div>
        {Array(rows).fill(0).map((_, index) => (
          <div key={index} className="flex space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'form') {
    return (
      <div className="w-full space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    );
  }

  // Default card loading state
  return (
    <div className="w-full space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="pt-4">
        <Skeleton className="h-10 w-1/3" />
      </div>
    </div>
  );
};

export default LoadingState;
