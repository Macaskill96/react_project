import React, {createContext, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../../pages/mainPage";
import {MovieDetail} from "../../components/Movies/MovieDetail/MovieDetail";
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
            <Routes>
                <Route path={'/'} element={<MainPage/>}>
                    <Route path={':id'} element={<MovieDetail/>}/>
                </Route>
            </Routes>
            </ThemeContext.Provider>
        </div>
    );
};

export {Layout};