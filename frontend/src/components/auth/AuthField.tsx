import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  helperText?: string;
};

export function AuthField({ label, helperText, id, ...props }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/70 focus:ring-1 focus:ring-primary/40"
        {...props}
      />
      {helperText && (
        <p className="text-xs leading-relaxed text-muted-foreground/70">{helperText}</p>
      )}
    </div>
  );
}