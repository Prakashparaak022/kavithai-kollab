"use client";
import { toast } from "react-toastify";
import { API_URLS } from "@/constants/apiUrls";
import { formatErrorMessage } from "@/utils/errorMessage";
import { useEffect, useState } from "react";

export const useISDCode = (dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isdFetchApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.ISD_CODE);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        const errrorResponse = await response.text();
        const errorMsg = formatErrorMessage(errrorResponse);
        toast.error(errorMsg || "Error while fetching ISD Code details");
        console.error("Error while fetching ISD Code details:", errrorResponse);
        setError(errorMsg);
      }
    } catch (error) {
      console.error("Error while fetching ISD Code:", error);
      const fallbackMessage =
        "An unexpected error occurred while fetching ISD Code details. Please try again.";
      setError(fallbackMessage);
      toast.error(fallbackMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isdFetchApi();
  }, [...dependencies]);

  return { data, loading, error, refetch: isdFetchApi };
};
