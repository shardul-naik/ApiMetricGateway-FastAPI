import React from 'react';

export default function StatCard({ title, value, unit, icon: Icon, color }) {
    const colorStyles = {
        amber: 'bg-amber-500/10 text-amber-400',
        indigo: 'bg-indigo-500/10 text-indigo-400',
        emerald: 'bg-emerald-500/10 text-emerald-400',
        blue: 'bg-blue-500/10 text-blue-400',
    };

    return (
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${colorStyles[color] || colorStyles.indigo}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">
                    {value} {unit && <span className="text-sm font-normal text-slate-400">{unit}</span>}
                </h3>
            </div>
        </div>
    );
}