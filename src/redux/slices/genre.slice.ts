import {IGenreData} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {genreServices} from "../../services";
import {AxiosError} from "axios";

interface IState {
    genre: IGenreData;
    trigger: boolean;
}


const initialState: IState = {
    genre:{
        genres:[]
    },
    trigger: false
};


const getAll = createAsyncThunk<IGenreData, void>(
    'genreSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await genreServices.getAll();
            return data;

        } catch (e) {
            const err = e as AxiosError;
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue({ message: 'error' });
            }
        }
    }
);

const slice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.genre = action.payload;
        });
    },
});

const { actions, reducer: genreReducer } = slice;

const genreAction = {
    ...actions,
    getAll
};


export { genreReducer, genreAction}
