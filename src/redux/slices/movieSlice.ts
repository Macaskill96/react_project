import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieData } from "../../interfaces";
import { movieServices } from "../../services";
import { AxiosError } from "axios";

interface IState {
    movies: IMovieData;
    trigger: boolean;
}

const initialState: IState = {
    movies: {
        page: null,
        results: [],
        total_pages: 15000000,
        total_results: 1500000000000,
    },
    trigger: false,
};

const getAll = createAsyncThunk<IMovieData>(
    "movieSlice/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await movieServices.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: "Error occurred" });
            }
        }
    }
);

const update = createAsyncThunk<IMovieData, number>(
    "movieSlice/update",
    async (page: number, { rejectWithValue }) => {
        try {
            const { data } = await movieServices.update(page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: "Error occurred" });
            }
        }
    }
);

const setPage = createAsyncThunk<number, number>(
    "movieSlice/setPage",
    async (page: number, { dispatch }) => {
        console.log('Old page:', page);
        await dispatch(getAll());
        console.log('New page', page);
        return page;
    }
);

const slice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        changeTrigger: (state) => {
            state.trigger = !state.trigger;
        },
        setMovies: (state, action: PayloadAction<IMovieData>) => {
            state.movies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(update.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(setPage.fulfilled, (state, action) => {
            state.movies.page = action.payload;
        });
    },
});

const { actions, reducer: movieReducer } = slice;
const movieAction = {
    ...actions,
    getAll,
    update,
    setPage,
};

export { movieAction, movieReducer };
