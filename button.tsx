import React from "react";
export function Button({ className = "", variant = "default", ...props }: any) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm rounded-md border";
  const v = variant === "outline" ? "bg-white border-slate-200" : variant === "ghost" ? "bg-transparent border-transparent" : "bg-slate-900 text-white border-slate-900";
  return <button className={`${base} ${v} ${className}`} {...props} />;
}
