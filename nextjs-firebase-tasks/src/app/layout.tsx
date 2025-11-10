import React from 'react';
import '../styles/globals.css';
import Header from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <div>
                <Header />
                <main>{children}</main>
            </div>
        </AuthProvider>
    );
};

export default Layout;