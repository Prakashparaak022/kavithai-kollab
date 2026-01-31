export function formatErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (!error) return fallback;

  if (typeof error === "string") {
    try {
      const parsed = JSON.parse(error);
      return (
        parsed?.message || Object.values(parsed?.data || {})[0] || fallback
      );
    } catch {
      return error;
    }
  }

  if (typeof error === "object" && error !== null) {
    const err = error as any;

    return err.message || Object.values(err.data || {})[0] || fallback;
  }

  return fallback;
}

export const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;
