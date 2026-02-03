export function formatErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (!error) return fallback;

  if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error);
      return (
        parsed?.message ||
        (typeof parsed?.data === "object" && parsed?.data !== null
          ? Object.values(parsed?.data)[0]
          : fallback) ||
        fallback
      );
    } catch {
      return error;
    }
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error) {
      return (error as { message: string }).message || fallback;
    }

    if ("data" in error) {
      const data = (error as { data: Record<string, unknown> }).data;
      return typeof data === "object" && data !== null
        ? (Object.values(data)[0] as string) || fallback
        : fallback;
    }
  }

  return fallback;
}

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;
