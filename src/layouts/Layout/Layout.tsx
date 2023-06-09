import React, {createContext, useState} from 'react';
import {MainPage} from '../../pages';
import './Layout.css'


export const ThemeContext = createContext<{
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    toggleTheme: () => void;
} | null>(null);

const Layout = () => {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => {
        setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    };
    return (
        <div className={`osnova ${theme}`}>
            <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            <MainPage/>
            </ThemeContext.Provider>
        </div>
    );
};

export {Layout};