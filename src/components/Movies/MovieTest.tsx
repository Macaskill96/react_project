import React, { FC, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { GenresContext } from '../../pages/mainPage';
import './forMovies.css';

const MovieTest: FC = () => {
    const dispatch = useAppDispatch();
    const movies = useAppSelector((state) => state.movieReducer.movies);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const context = useContext(GenresContext);
    if (context === null) {
        throw new Error('GenresContext is not available');
    }
    const { checkedGenres, setCheckedGenres } = context;

    const totalPages = movies.total_pages;
    const displayPageRange = 10;


    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            dispatch(movieAction.update(page));
        }
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const halfDisplayRange = Math.floor(displayPageRange / 2);
        let startPage = Math.max(1, currentPage - halfDisplayRange);
        let endPage = Math.min(totalPages, startPage + displayPageRange - 1);

        if (endPage - startPage + 1 < displayPageRange) {
            startPage = Math.max(1, endPage - displayPageRange + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <div
                    key={i}
                    className={`page-number ${i === currentPage ? 'active' : ''}`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </div>
            );
        }
        return pageNumbers;
    };


    const prev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentPage !== null && currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            dispatch(movieAction.update(newPage));
        }
    };

    const next = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentPage !== null) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            dispatch(movieAction.update(newPage));
        }
    };

    useEffect(() => {
        if (currentPage !== null) {
            setCurrentPage(currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        dispatch(movieAction.getAll());
    }, [dispatch]);

    const [filteredMovies, setFilteredMovies] = useState(movies.results);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        filterMovies();
        setLoading(false);
    }, [checkedGenres, movies.results]);

    const filterMovies = () => {
        if (checkedGenres.length > 0) {
            const filtered = movies.results.filter((movie) => {
                for (let genreId of movie.genre_ids) {
                    if (checkedGenres.includes(genreId)) {
                        return true;
                    }
                }
                return false;
            });
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies.results);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={'test'}>
                {filteredMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className={'movie'}
                        onClick={() => navigate(`${movie.id}`, { state: { ...movie } })}
                    >
                        <div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
                                alt={movie.title}
                                className={'img'}
                            />
                        </div>
                        <div className={'txt'}>{movie.title}</div>
                    </div>
                ))}
            </div>

            <div className={'blockWithButton'}>
                <button onClick={prev} className={'pagin'} disabled={currentPage===1}>
                    Prev
                </button>
                <div className={'renderPage'}> {renderPageNumbers()} </div>
                <button onClick={next} className={'pagin'} disabled={currentPage===totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export { MovieTest };
