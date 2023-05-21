import React from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { MovieTest} from "../../components";

const MoviePage = () => {
    const outlet = useOutlet();


    return (
        <div>
            {!outlet ? <MovieTest/> : <Outlet />}
        </div>
    );
};

export { MoviePage };
