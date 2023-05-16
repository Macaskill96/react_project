import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { movieAction } from "../../redux";
import { RootState } from "../../redux";
import { Movie } from "./Movie";

const Movies: FC = () => {
    const { movies, trigger } = useAppSelector((state: RootState) => state.movieReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieAction.getAll());
    }, [dispatch, trigger]);

    return (
        <div>
            <div>
                {Array.isArray(movies) && movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export { Movies };
