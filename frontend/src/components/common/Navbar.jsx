import React from 'react';
import { Activity, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { userRole, logout } = useAuth();
    const isAdmin = userRole === 'admin';

    return (
        <nav className={`border-b sticky top-0 z-50 px-6 py-4 backdrop-blur-md ${isAdmin ? 'border-amber-500/30 bg-slate-900/50' : 'border-slate-800 bg-slate-900/50'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {isAdmin ? <ShieldAlert className="w-7 h-7 text-amber-500" /> : <Activity className="w-7 h-7 text-indigo-500" />}
                    <span className="text-xl font-bold tracking-wider text-white">
                        APIMetric {isAdmin ? <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded ml-2">ADMIN ANALYTICS CONSOLE</span> : 'User Portal'}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm transition"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                </button>
            </div>
        </nav>
    );
}