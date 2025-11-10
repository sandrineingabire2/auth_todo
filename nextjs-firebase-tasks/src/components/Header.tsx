import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-xl">Task Management App</h1>
            {user && <p className="mt-2">Welcome, {user.email}!</p>}
        </header>
    );
};

export default Header;