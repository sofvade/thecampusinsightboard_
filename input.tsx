import React from "react";
export function Input({ className = "", ...props }: any) { return <input className={`border border-slate-300 rounded-md px-3 py-2 ${className}`} {...props} />; }
