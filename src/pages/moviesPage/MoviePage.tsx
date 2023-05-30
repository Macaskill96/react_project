import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { MovieList} from "../../components";

const MoviePage = () => {
    const outlet = useOutlet();


    return (
        <div>
            {!outlet ? <MovieList/> : <Outlet />}
        </div>
    );
};

export { MoviePage };
