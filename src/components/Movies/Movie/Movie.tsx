import React, { FC } from 'react';
import { IMovie } from "../../../interfaces";

interface IMovieProps {
    movie: IMovie;
}

const Movie: FC<IMovieProps> = ({ movie }) => {
    const { id, title, adult } = movie;

    return (
        <div>
            dasdasd
            <div>id: {id}</div>
            <div>Title: {title}</div>
            <div>Adult: {adult ? 'Yes' : 'No'}</div>
        </div>
    );
};

export { Movie };
