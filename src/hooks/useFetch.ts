import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useFetch = (url: string, options?: RequestInit) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [abort, setAbort] = useState<() => void>(() => {});
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();
  const optionsRef = useRef(options);

  const fetchData = useCallback(async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setAbort(() => () => abortController.abort());

    try {
      console.log("anas", optionsRef.current);
      const res = await fetch(url, { ...optionsRef.current, signal });
      let json = null;
      try {
        const text = await res.text();
        json = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
      }

      if (!res.ok) {
        console.warn(`Fetch failed with status: ${res.status}`);

        if (res.status === 401 || json?.message === "Unauthorized") {
          console.warn("User unauthorized! Redirecting...");
          Cookies.remove("token");
          setUnauthorized(true);
          navigate("/");
          return;
        }

        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setResponse(json);
      setError(null); // Clear previous errors if successful
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Fetch error:", error);
        setError(error);
      }
    }
  }, [url, navigate]);

  useEffect(() => {
    fetchData();
    // return () => abort();
  }, [fetchData]);

  return { response, error, abort, refetch: fetchData };
};

export default useFetch;
