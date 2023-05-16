import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../interfaces";
import { movieServices } from "../../services";
import { AxiosError } from "axios";

interface IState {
    movies: IMovie[];
    trigger: boolean;
}

const initialState: IState = {
    movies: [],
    trigger: false,
};

const getAll = createAsyncThunk<IMovie[], void>(
    'movieSlice/getAll',
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

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

const { actions, reducer: movieReducer } = slice;
const movieAction = {
    ...actions,
    getAll,
};

export { movieAction, movieReducer };
