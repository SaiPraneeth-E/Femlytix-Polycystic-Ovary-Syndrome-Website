"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, UserCog, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import AnimatedOvaryBackground, { OvaryIcon } from "@/components/AnimatedOvaryBackground";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState<"login" | "register" | "admin">("login");
    const [loading, setLoading] = useState(false);
    const [adminLoading, setAdminLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePatientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulated Network Request for Developer Demo Mode
        setTimeout(() => {
            console.warn("Supabase fetch bypassed - Developer Mode Active.");
            if (mode === "register") {
                setError("Check your email to confirm your account, then sign in.");
                setMode("login");
                setLoading(false);
            } else {
                router.push("/intake");
            }
        }, 1200);
    };

    const handleAdminLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setAdminLoading(true);
        setError("");
        
        const isRootAdmin = email === "pcosadmin7813@gmail.com" && password === "admin@7813.";
        let isStaff = false;
        
        try {
            const stored = localStorage.getItem('invitedStaff');
            if (stored) {
                const users = JSON.parse(stored);
                const staffUser = users.find((u: any) => u.email === email && u.active && (u.role === "SysAdmin" || u.role === "Doctor" || u.role === "Nurse"));
                if (staffUser && password === "staff123") {
                    isStaff = true;
                }
            }
        } catch (e) {
            console.error("Error reading staff data", e);
        }

        if (isRootAdmin || isStaff) {
            setTimeout(() => {
                router.push("/admin");
            }, 800);
        } else {
            setAdminLoading(false);
            setError("Invalid administrator credentials or unauthorized access.");
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 relative bg-slate-950">
            <AnimatedOvaryBackground />

            <div className="w-full max-w-md mb-6 flex justify-start z-10">
                <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition-colors bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md glass-panel p-8 z-10 text-center relative overflow-hidden border border-pink-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
                
                <div className="flex justify-center mb-6 mt-2">
                    <OvaryIcon className="w-14 h-14 text-pink-500" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === "login" ? "Patient Portal Login" : mode === "register" ? "Create Patient Account" : "Administrator Portal Login"}
                </h2>
                <p className="text-slate-400 text-sm mb-8">
                    {mode === "admin" ? "Secure access for clinical staff." : "Secure access to your biometric AI scans."}
                </p>

                {error && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${error.includes("Check your email") ? "bg-emerald-900/50 border border-emerald-500/50 text-emerald-300" : "bg-red-900/50 border border-red-500/50 text-red-300"}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={mode === "admin" ? handleAdminLogin : handlePatientSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || adminLoading}
                        className={`w-full flex justify-center items-center gap-2 text-white font-bold py-3 rounded-lg mt-6 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] disabled:opacity-50 ${mode === "admin" ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]" : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500"}`}
                    >
                        {loading || adminLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (mode === "login" ? "Sign In as Patient" : mode === "register" ? "Sign Up as Patient" : "Secure Administrator Login")}
                        {!(loading || adminLoading) && <ArrowRight className="w-4 h-4" />}
                    </button>
                </form>

                {mode !== "admin" && (
                    <div className="mt-6 w-full animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="w-1/4 border-b border-slate-700/50"></span>
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Or continue with</span>
                            <span className="w-1/4 border-b border-slate-700/50"></span>
                        </div>
                        
                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => router.push("/intake"), 800);
                            }}
                            disabled={loading || adminLoading}
                            className="w-full flex justify-center items-center gap-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium py-3 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                <path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            Google
                        </button>
                    </div>
                )}

                <div className="mt-6 text-sm text-slate-400 mb-8">
                    {mode === "login" ? (
                        <p>New patient? <button type="button" onClick={() => { setMode("register"); setError(""); }} className="text-pink-400 hover:text-pink-300 font-medium transition-colors">Register here</button></p>
                    ) : mode === "register" ? (
                        <p>Already registered? <button type="button" onClick={() => { setMode("login"); setError(""); }} className="text-pink-400 hover:text-pink-300 font-medium transition-colors">Sign in</button></p>
                    ) : (
                        <p>Not an administrator? <button type="button" onClick={() => { setMode("login"); setError(""); }} className="text-pink-400 hover:text-pink-300 font-medium transition-colors">Patient Login</button></p>
                    )}
                </div>

                {/* Separate Admin/Patient Toggle Button */}
                <div className="relative pt-6 border-t border-slate-800">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] px-4 text-xs font-semibold text-slate-500 tracking-wider">
                        {mode === "admin" ? "PATIENT PORTAL" : "STAFF ONLY"}
                    </div>
                    
                    <button
                        type="button"
                        onClick={() => { setMode(mode === "admin" ? "login" : "admin"); setError(""); setEmail(""); setPassword(""); }}
                        disabled={loading || adminLoading}
                        className="w-full flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500/30 text-slate-200 font-medium py-3 rounded-lg transition-all disabled:opacity-50"
                    >
                        {mode === "admin" ? <ArrowLeft className="w-4 h-4 text-purple-400" /> : <UserCog className="w-4 h-4 text-purple-400" />}
                        {mode === "admin" ? "Switch to Patient Login" : "Staff / Administrator Portal"}
                    </button>
                </div>
            </div>
        </main>
    );
}
