export function formatErrorMessage(errorMsg) {
  try {
    const parsed = typeof errorMsg === "string" ? JSON.parse(errorMsg) : errorMsg;
    return parsed?.message || Object.values(parsed?.data || {})[0] || "Something went wrong";
  } catch {
    return typeof errorMsg === "string" ? errorMsg : "Something went wrong";
  }
}
