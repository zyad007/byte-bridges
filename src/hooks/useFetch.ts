import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useFetch = (url: string, options?: RequestInit) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [abort, setAbort] = useState<() => void>(() => {});
  const [unauthorized, setUnauthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setAbort(() => abortController.abort);

        const res = await fetch(url, { ...options, signal });

        const text = await res.text();
        const json = text ? JSON.parse(text) : null;

        if (!res.ok) {
          console.log(`Fetch failed with status: ${res.status}`);
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
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error as Error);
      }
    };

    fetchData();
  }, [url, options ? JSON.stringify(options) : null]);

  return { response, error, abort };
};

export default useFetch;
