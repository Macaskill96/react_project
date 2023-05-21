import React, {FC, useState, useEffect, useContext} from 'react';
import { IGenre } from '../../../interfaces';
import './Genres.css';
import {ThemeContext} from "../../../layouts/Layout";

interface IProps {
    genre: IGenre;
    selectedGenres: number[];
    onGenreChange: (selectedGenres: number[]) => void;
}

const Genres: FC<IProps> = ({ genre, selectedGenres, onGenreChange }) => {
    const { name, id } = genre;
    const [isChecked, setIsChecked] = useState(selectedGenres.includes(id));
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme;


    useEffect(() => {
        setIsChecked(selectedGenres.includes(id));
    }, [selectedGenres, id]);

    const handleCheckboxChange = () => {
        setIsChecked((prevChecked) => !prevChecked);
        const updatedSelectedGenres = isChecked
            ? selectedGenres.filter((selectedId) => selectedId !== id)
            : [...selectedGenres, id];
        onGenreChange(updatedSelectedGenres);
    };

    return (
        <div className="checkbox">
            <div>
                <input
                    type="checkbox"
                    id={`ch${id}`}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor={`ch${id}`} className={`labe ${theme}`}>{name}</label>
            </div>
        </div>
    );
};

export { Genres };
