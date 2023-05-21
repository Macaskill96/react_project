import React, { FC } from 'react';
import {IMovie} from "../../../interfaces";

interface IMovieProps {
    movie: IMovie;
}

const Movie: FC<IMovieProps> = ({movie}) => {
    const {id, original_title} = movie;

    return (
        <div>
            <div>{id}</div>
            <div>{original_title}</div>
        </div>
    );
};

export { Movie };
