import React from 'react';
import { Trash2 } from 'lucide-react';

export default function KeyManagementTable({ userActivity, onRevokeKey }) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">User Key Control Table</h2>
            <div className="space-y-6">
                {userActivity.map((u) => (
                    <div key={u.user_id} className="bg-slate-900 border border-slate-700/60 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                                <span className="font-mono text-xs text-amber-400 font-semibold mr-2">User #{u.user_id}</span>
                                <span className="text-white font-semibold text-sm">{u.email}</span>
                            </div>
                            <div className="flex space-x-4 text-xs">
                                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold border border-emerald-500/20">
                                    {u.total_requests} requests
                                </span>
                                <span className="text-slate-400">{u.avg_latency_ms} ms avg</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {u.keys.length === 0 ? (
                                <p className="text-xs text-slate-500">No active keys for this user.</p>
                            ) : (
                                u.keys.map((k) => (
                                    <div key={k.id} className="flex items-center justify-between bg-slate-950 p-2.5 rounded border border-slate-800/80">
                                        <span className="font-mono text-xs text-indigo-300">{k.key}</span>
                                        <div className="flex items-center space-x-3">
                                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${k.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'}`}>
                                                {k.is_active ? 'Active' : 'Revoked'}
                                            </span>
                                            {k.is_active && (
                                                <button
                                                    onClick={() => onRevokeKey(k.id)}
                                                    className="flex items-center space-x-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Revoke</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}