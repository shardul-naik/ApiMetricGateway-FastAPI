import React, { useState } from 'react';
import { Activity, AlertCircle, Mail, Lock, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loginUser, registerUser, registerAdmin } from '../../services/authService';

export default function AuthCard() {
    const { saveAuth } = useAuth();
    const [authMode, setAuthMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminKeyInput, setAdminKeyInput] = useState('');
    const [authError, setAuthError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setAuthError('');
        try {
            if (authMode === 'register-user') {
                await registerUser(email, password);
                setAuthMode('login');
                setAuthError('Registration successful! Please log in.');
            } else if (authMode === 'register-admin') {
                await registerAdmin(email, password, adminKeyInput);
                setAuthMode('login');
                setAuthError('Admin account created! Please log in.');
            } else {
                const data = await loginUser(email, password);
                saveAuth(data.access_token, data.role);
            }
        } catch (err) {
            setAuthError(err.response?.data?.detail || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl">
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <Activity className="w-8 h-8 text-indigo-500" />
                    <span className="text-2xl font-bold tracking-wider text-white">APIMetric Gateway</span>
                </div>

                <div className="flex mb-6 border-b border-slate-700 text-xs font-semibold">
                    <button
                        className={`flex-1 pb-3 text-center ${authMode === 'login' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400'}`}
                        onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 pb-3 text-center ${authMode === 'register-user' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-slate-400'}`}
                        onClick={() => { setAuthMode('register-user'); setAuthError(''); }}
                    >
                        User Register
                    </button>
                    <button
                        className={`flex-1 pb-3 text-center ${authMode === 'register-admin' ? 'border-b-2 border-amber-500 text-amber-400' : 'text-slate-400'}`}
                        onClick={() => { setAuthMode('register-admin'); setAuthError(''); }}
                    >
                        Admin Register
                    </button>
                </div>

                {authError && (
                    <div className="mb-4 p-3 bg-indigo-950/50 border border-indigo-500/30 rounded-lg flex items-center space-x-2 text-indigo-300 text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{authError}</span>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                placeholder="developer@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {authMode === 'register-admin' && (
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-amber-400 mb-1">Admin Secret Key</label>
                            <div className="relative">
                                <ShieldAlert className="absolute left-3 top-3 w-5 h-5 text-amber-500" />
                                <input
                                    type="password"
                                    required
                                    value={adminKeyInput}
                                    onChange={(e) => setAdminKeyInput(e.target.value)}
                                    className="w-full bg-slate-900 border border-amber-500/50 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                                    placeholder="Enter admin secret key"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full font-semibold py-2.5 rounded-lg transition duration-200 shadow-lg ${authMode === 'register-admin'
                            ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                            }`}
                    >
                        {authMode === 'login' ? 'Sign In' : authMode === 'register-user' ? 'Create User Account' : 'Create Admin Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}