
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseApiLoaderOptions {
  successMessage?: string;
  errorMessage?: string;
}

export function useApiLoader<T extends any[], R>(
  apiFunction: (...args: T) => Promise<R>,
  options: UseApiLoaderOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);
  const { toast } = useToast();

  const execute = useCallback(
    async (...args: T): Promise<R | null> => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        
        if (options.successMessage) {
          toast({
            title: "Success",
            description: options.successMessage,
          });
        }
        
        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "An error occurred";
        setError(err instanceof Error ? err : new Error(errorMsg));
        
        toast({
          title: "Error",
          description: options.errorMessage || errorMsg,
          variant: "destructive",
        });
        
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, options.successMessage, options.errorMessage, toast]
  );

  return {
    execute,
    isLoading,
    error,
    data,
    reset: useCallback(() => {
      setData(null);
      setError(null);
    }, []),
  };
}
