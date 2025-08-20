import React from "react";
export function Card({ className = "", ...props }: any) { return <div className={`border border-slate-200 bg-white ${className}`} {...props} />; }
export function CardHeader({ className = "", ...props }: any) { return <div className={`p-4 border-b border-slate-100 ${className}`} {...props} />; }
export function CardTitle({ className = "", ...props }: any) { return <div className={`font-semibold ${className}`} {...props} />; }
export function CardDescription({ className = "", ...props }: any) { return <div className={`text-sm text-slate-500 ${className}`} {...props} />; }
export function CardContent({ className = "", ...props }: any) { return <div className={`p-4 ${className}`} {...props} />; }
