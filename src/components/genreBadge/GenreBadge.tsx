import React, { FC, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { genreAction } from '../../redux';
import {Genres} from './Genres';
import './GenreBadge.css';
import { GenresContext} from "../../pages";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../../layouts/Layout";




const GenreBadge: FC = () => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme;
    const context = useContext(GenresContext);

    if (context === null) {
        throw new Error('Error');
    }
    const { checkedGenres, setCheckedGenres } = context;

    const { genre, trigger } = useAppSelector((state) => state.genreReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreAction.getAll());
    }, [dispatch, trigger]);

    const handleGenreChange = (selectedGenres: number[]) => {
        setFrom(selectedGenres);
    };

    const [from, setFrom] = useState<number[]>([])


    const handleFind = () => {
        setCheckedGenres(from);
        navigate('/');
    }
    const handleReset = () => {
        setFrom([]);
        setCheckedGenres([]);
    };




    return (
        <div className="genresBlock">
            <h1 className={`h1 ${theme}`}>Genres</h1>
            <div className="genreBar">
                {genre.genres.map((genre) => (
                    <Genres
                        key={genre.id}
                        genre={genre}
                        selectedGenres={from}
                        onGenreChange={handleGenreChange}
                    />
                ))}
            </div>
            <div className={`blockForFilter ${theme}`}>
                <button className={`buttonFind ${theme}`} onClick={handleFind}>
                    Find
                </button>
                <button className={`buttonFind ${theme}`} onClick={handleReset}>
                    Reset
                </button>
            </div>

        </div>
    );
};

export {GenreBadge};
