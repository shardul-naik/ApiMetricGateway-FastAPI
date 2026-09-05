import React, { useState } from 'react';
import { Key, Copy, Check } from 'lucide-react';

export default function KeyList({ keys, onGenerateKey }) {
    const [copiedKey, setCopiedKey] = useState('');

    const copyToClipboard = (keyStr) => {
        navigator.clipboard.writeText(keyStr);
        setCopiedKey(keyStr);
        setTimeout(() => setCopiedKey(''), 2000);
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Key className="w-5 h-5 text-indigo-400" />
                        <span>My API Keys</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Generate and copy your credentials to access microservices.</p>
                </div>
                <button
                    onClick={onGenerateKey}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/20"
                >
                    + Generate New Key
                </button>
            </div>

            <div className="space-y-3">
                {keys.length === 0 ? (
                    <p className="text-slate-500 text-sm py-4 text-center">No active API keys generated yet.</p>
                ) : (
                    keys.map((k) => (
                        <div key={k.id} className="flex items-center justify-between bg-slate-900 border border-slate-700/60 p-4 rounded-lg">
                            <div className="font-mono text-sm text-indigo-300 tracking-wide">{k.key}</div>
                            <div className="flex items-center space-x-4">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${k.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400'}`}>
                                    {k.is_active ? 'Active' : 'Revoked'}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(k.key)}
                                    className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-800 transition"
                                    title="Copy API Key"
                                >
                                    {copiedKey === k.key ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}