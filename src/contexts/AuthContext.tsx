import React, { createContext, ReactNode, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextData {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
