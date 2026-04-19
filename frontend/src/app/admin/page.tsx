"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Users,
  AlertTriangle,
  Server,
  LogOut,
  ChevronRight,
  BrainCircuit,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Mocked Metrics for Demo
  const stats = [
    { name: "Total Prescreened", value: "1,248", change: "+12%", icon: Users, color: "text-blue-400" },
    { name: "High-Risk Detected", value: "342", change: "+4%", icon: AlertTriangle, color: "text-amber-400" },
    { name: "AI Confidence Avg", value: "94.2%", change: "+1.1%", icon: BrainCircuit, color: "text-purple-400" },
    { name: "Sys Health", value: "99.9%", change: "Stable", icon: Activity, color: "text-emerald-400" },
  ];

  const recentPatients = [
    { id: "PT-0091", age: 26, status: "High Risk", confidence: "98%", time: "10 min ago", severity: "critical" },
    { id: "PT-0092", age: 31, status: "Clear", confidence: "87%", time: "45 min ago", severity: "normal" },
    { id: "PT-0093", age: 22, status: "Review Required", confidence: "61%", time: "2 hours ago", severity: "warning" },
    { id: "PT-0094", age: 29, status: "High Risk", confidence: "92%", time: "3 hours ago", severity: "critical" },
  ];

  const mlNodes = [
    { name: "FastAPI Orchestrator", status: "Online", uptime: "14d 2h", port: 8000 },
    { name: "PyTorch Inference (Vision)", status: "Online", uptime: "14d 2h", port: 8001 },
    { name: "LLM Gemini Flash Interface", status: "Connected", uptime: "14d 2h", port: "Global" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Background Effect */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-white">Administrator<span className="text-cyan-500">.AI</span></h1>
          </div>
          
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Exit Portal
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-current opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-500" />
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-3xl font-bold text-white mb-0">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Live Patient Queue
              </h2>
              <button className="text-sm text-cyan-400 hover:underline">View All Pipeline</button>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-sm text-slate-400">
                    <th className="p-4 font-medium">Patient ID</th>
                    <th className="p-4 font-medium">Age</th>
                    <th className="p-4 font-medium">AI Diagnosis</th>
                    <th className="p-4 font-medium">Confidence</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentPatients.map((pt, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 font-medium text-slate-300">{pt.id}</td>
                      <td className="p-4 text-slate-400">{pt.age}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          pt.severity === 'critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                          pt.severity === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {pt.severity === 'critical' ? <AlertTriangle className="w-3.5 h-3.5" /> : 
                           pt.severity === 'warning' ? <Clock className="w-3.5 h-3.5" /> : 
                           <CheckCircle2 className="w-3.5 h-3.5" />}
                          {pt.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${parseInt(pt.confidence) > 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                              style={{ width: pt.confidence }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-300">{pt.confidence}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" />
              ML Architecture Health
            </h2>
            
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
              {mlNodes.map((node, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-slate-200 text-sm">{node.name}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {node.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>Uptime: {node.uptime}</span>
                    <span>Port: {node.port}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <BrainCircuit className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-semibold text-white mb-2">Retrain Models</h3>
              <p className="text-sm text-slate-400 mb-4">Initiate automated continuous learning loop using recent validated patient data.</p>
              <button disabled className="w-full bg-blue-600/50 cursor-not-allowed hover:bg-blue-600/60 text-white font-medium py-2 rounded-lg text-sm transition-colors border border-blue-500/30">
                Data Volume Insufficient
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
