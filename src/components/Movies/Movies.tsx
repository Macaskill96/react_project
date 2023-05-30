import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../layouts/Layout';

const Movies: FC = () => {
    const { movies, trigger } = useAppSelector((state) => state.movieReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme;

    useEffect(() => {
        dispatch(movieAction.getAll());
    }, [dispatch, trigger]);

    const [value, setValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(true);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const filterMovie = movies.results.filter((movie) => {
        return movie.title.toLowerCase().includes(value.toLowerCase());
    });

    const itemClickHandler = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLElement;
        const movieId = parseInt(target.getAttribute('data-movie-id') || '');
        setValue(target.textContent ?? '');
        setIsOpen(!isOpen);
        setSelectedMovieId(movieId);
        goMovieDetail(movieId);
    };

    const inputClickHandler = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const goMovieDetail = (movieId: number) => {
        navigate(`${movieId}`);
        setValue('');
    };

    return (
        <div className={`divForInput ${theme}`} ref={ref}>
            <form className={'inputForm'}>
                <input
                    type={'text'}
                    placeholder={'Search movie'}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onClick={inputClickHandler}
                    className={`input ${theme}`}
                />

                <ul className={`ul ${theme}`}>
                    {value && isOpen ? (
                        filterMovie.map((movie) => (
                            <li
                                onClick={itemClickHandler}
                                key={movie.id}
                                className={`searchResult ${theme}`}
                                data-movie-id={movie.id}
                            >
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className={'resultImg'} alt={'Movie'} />
                                {movie.title}
                            </li>
                        ))
                    ) : null

                    }
                </ul>
            </form>
        </div>
    );
};

export { Movies };
