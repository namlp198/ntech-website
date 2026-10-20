import type { InputHTMLAttributes } from "react";

export function FormField({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const errorId = `${id}-error`;
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-semibold">
      {label}
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="min-h-11 rounded-lg border border-border bg-white px-3 py-2 font-normal"
        {...props}
      />
      {error ? (
        <span id={errorId} role="alert" className="font-normal text-red-700">
          {error}
        </span>
      ) : null}
    </label>
  );
}

