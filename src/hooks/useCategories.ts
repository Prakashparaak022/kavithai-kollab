import { fetchAllCategories } from "@/services/api/category.service";
import { ApiCategory } from "@/types/api";
import { useEffect, useState } from "react";

export const useCategories = () => {
  const [data, setData] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const res = await fetchAllCategories();
        if (isMounted) setData(res.content);
      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
