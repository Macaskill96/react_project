import {IRes} from "../types";
import {IGenre, IMovie} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

const movieServices = {
    getAll: (): IRes<IMovie[]> => axiosService.get(urls.movies)
}

const genreService = {
    getAll: (): IRes<IGenre> => axiosService.get(urls.gerne)
}
export {
    movieServices
}