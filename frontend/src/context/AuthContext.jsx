import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'user');

    const saveAuth = (accessToken, role) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('role', role);
        setToken(accessToken);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken('');
        setUserRole('user');
    };

    return (
        <AuthContext.Provider value={{ token, userRole, saveAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);