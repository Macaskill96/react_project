import React, {useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from "../../../hooks";
import './MovieDetail.css'
import {ThemeContext} from "../../../layouts/Layout";


const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const movies = useAppSelector((state) => state.movieReducer.movies);
    const movie = movies.results.find((movie) => movie.id === Number(id));
    const themeContext = useContext(ThemeContext)
    const theme = themeContext?.theme;

    if (!movie) {
        return <div>Movie not found</div>;
    }



    const goBack = () => {
        navigate(-1);
    };


    return (
        <div className={`general ${theme}`}>
            <div> <button className={'backButton'} onClick={goBack}>Back</button> </div>
            <div className={'title'}>
                <h2>{movie.title}</h2>
                <h4>{movie.original_title}</h4>
            </div>
            <div className={'divImg'}> <img src={ `https://image.tmdb.org/t/p/w500/` + movie.poster_path} alt={'Poster'} className={'imgPoster'}/>

                <div className={'movieCharacters'}>
                    <div className={'characters'}>
                        <div className={'b1'}>Language:</div>
                        <div>{movie.original_language}</div>
                    </div>
                    <div className={'characters'}>
                        <div className={'b1'}>Genre:</div>
                        <div>{movie.genre_ids}</div>
                    </div>
                    <div className={'characters'}>
                        <div className={'b1'}>Popularity:</div>
                        <div>{movie.popularity}</div>
                    </div>
                    <div className={'characters'}>
                        <div className={'b1'}>Release Date:</div>
                        <div>{movie.release_date}</div>
                    </div>
                    <div className={'characters'}>
                        <div className={'b1'}>Vote count:</div>
                        <div>{movie.vote_count}</div>
                    </div>
                    <div className={'characters'}>
                        <div className={'b1'}>Rating:</div>
                        <div>{movie.vote_average}</div>
                    </div>
                </div>
            </div>

            <div>
                <div className={'aboutMovie'}>
                    <h3>About Movie</h3>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <div>video</div>
        </div>
    );
};

export { MovieDetail };
