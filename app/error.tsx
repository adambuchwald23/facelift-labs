"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-foreground-muted">
        An unexpected error occurred. Please try again or refresh the page.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-foreground-muted/50">
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center rounded-[25px] bg-accent px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:brightness-110"
      >
        Try Again
      </button>
    </div>
  );
}
