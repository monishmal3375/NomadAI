"use client";

import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-95",
  secondary:
    "bg-white/70 border border-white/55 text-slate-900 hover:bg-white",
  ghost:
    "bg-transparent text-slate-900 hover:bg-white/55",
  danger:
    "text-white bg-gradient-to-r from-rose-500 to-red-600",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "secondary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[base, variants[variant], sizes[size], className].join(" ")}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
