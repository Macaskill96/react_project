import {IRes} from "../types";
import {IAuthInterface, IGenreData, IMovieData} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";



const movieServices = {
    getAll: (page = 1): IRes<IMovieData> => axiosService.get(urls.movies, {params:{page}}),
    update: (page: number): IRes<IMovieData> => axiosService.get(urls.movies, {params:{page} })
}



const genreServices = {
    getAll: (): IRes<IGenreData> => axiosService.get(urls.gerne)
}
const authService = {
    getAll: (account_id = 19447345): Promise<IRes<IAuthInterface>> =>
        axiosService.get(`https://api.themoviedb.org/3/account/${account_id}`),
};

export {
    movieServices, genreServices, authService
}