import { useState, useEffect, useCallback } from "react";

export function useRefetch(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

  const refetch = useCallback(() => {
    setReload((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunc(); 
        const result = response.data.data || response; 
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunc, reload]);

  return { data, loading, error, refetch };
}