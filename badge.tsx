import React from "react";
export function Badge({ className = "", children }: any) { return <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>{children}</span>; }
