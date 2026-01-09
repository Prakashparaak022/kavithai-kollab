import { API_URLS } from "@/services/apiUrls";

export async function fetchBrandID() {
  const timestamp = new Date().getTime();
  let url = `${API_URLS.BRAND_DETAILS}?timestamp=${timestamp}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("API error status:", response.status);
      throw new Error(`Brand ID fetch failed (${response.status})`);
    }
    const data = await response.json();
    const brandId = data?.brandId;
    if (!brandId) {
      throw new Error("Brand ID missing from API response");
    }

    return brandId;
  } catch (err) {
    console.error("Error fetching brand id:", err);
    throw err;
  }
}
