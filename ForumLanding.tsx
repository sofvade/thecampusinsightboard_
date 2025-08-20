"use client";
import { useMemo, useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

async function fetchUniversities() {
  const res = await fetch("/api/universities");
  return res.json();
}

export default function ForumLanding() {
  const [query, setQuery] = useState("");
  const [universities, setUniversities] = useState<any[]>([]);

  useEffect(() => { fetchUniversities().then(setUniversities); }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return universities.filter((u) =>
      (u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.tags.join(" ").toLowerCase().includes(q))
    );
  }, [query, universities]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-campus.png" alt="The Campus Insight Board" className="h-12 object-contain" />
            <span className="font-semibold tracking-tight text-slate-800">The Campus Insight Board</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#universities" className="hover:text-slate-900">Universities</a>
            <a href="#rules" className="hover:text-slate-900">Rules</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button className="rounded-2xl">Login / Register</Button>
            <Button className="rounded-2xl">Post Review</Button>
          </div>
        </div>
      </header>

      <section id="universities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Explore Universities</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Input placeholder="Search by university, city or area" value={query} onChange={(e:any)=>setQuery(e.target.value)} className="h-12 pl-10 pr-3 rounded-2xl"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"/>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((u:any) => (
            <Card key={u.id} className="rounded-3xl hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{u.name}</span>
                  <Badge className="rounded-full">{u.city}</Badge>
                </CardTitle>
                <CardDescription>{u.tags.join(" · ")}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Star className="h-4 w-4"/><span className="font-medium">{u.rating?.toFixed(1)}</span>
                  <span className="text-slate-400">·</span>
                  <span>{u.reviews} reviews</span>
                </div>
                <Link href={`/university/${u.id}`}><Button variant="outline" className="rounded-2xl">Profile</Button></Link>
              </CardContent>
            </Card>
          ))}
          {results.length===0 && <div className="col-span-full text-center text-slate-500 py-10">No results. Adjust your search.</div>}
        </div>
      </section>
    </div>
  );
}
