import React, {createContext, useContext, useState} from 'react';
import { Header } from "../../components/header";
import { GenreBadge } from "../../components";
import './mainPageCss.css'
import { MoviePage } from "../moviesPage";
import {ThemeContext} from "../../layouts/Layout";


interface IGenresContext {
    checkedGenres: number[];
    setCheckedGenres: React.Dispatch<React.SetStateAction<number[]>>;
}

export const GenresContext = createContext<IGenresContext | null>(null);




const MainPage = () => {
    const [checkedGenres, setCheckedGenres] = useState<number[]>([]);
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme;


    return (
        <GenresContext.Provider value={{checkedGenres, setCheckedGenres}}>

            <div className={`mainPage ${theme}`}>
                <div className="header">
                    <Header />

                </div>
                <div className="fortwo">
                    <div className={`genreBadge ${theme}`}>
                        <GenreBadge/>
                    </div>
                    <div className={`moviePage ${theme}`}>
                        <MoviePage />
                    </div>
                </div>
            </div>

        </GenresContext.Provider>);
};

export { MainPage };
