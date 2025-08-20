import React from "react";

async function getUniversity(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/universities/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function UniversityPage({ params }: { params: { id: string } }) {
  const uni = await getUniversity(params.id);
  if (!uni?.id) return <div className="max-w-3xl mx-auto p-6">University not found.</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">{uni.name}</h1>
      <p className="text-slate-600">{uni.city} · {uni.country}</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded-xl"><div className="text-slate-500 text-sm">Employability</div><div className="text-2xl font-semibold">{uni.employability ?? '—'}%</div></div>
        <div className="p-4 border rounded-xl"><div className="text-slate-500 text-sm">Scholarships</div><div className="text-2xl font-semibold">{uni.scholarships ?? '—'}</div></div>
        <div className="p-4 border rounded-xl"><div className="text-slate-500 text-sm">Housing Score</div><div className="text-2xl font-semibold">{uni.housingScore ?? '—'}</div></div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-slate-700">Tags: {uni.tags?.join(", ")}</p>
      </div>
    </div>
  );
}
