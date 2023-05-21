import {IAuthInterface} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    auth: IAuthInterface,
    trigger: boolean
}

const initialState: IState = {
 auth: {
     name:'',
     avatar:{},
     include_adult: true,
     username:'',
     id:1,
     iso_639_1:'',
     iso_3166_1: ''
 },
    trigger:false
};

const getAll = createAsyncThunk<IAuthInterface, void>(
    'authSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.getAll();
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
    name: 'authSlice',
    initialState,
    reducers: {
        changeTrigger: state => {
            state.trigger = !state.trigger
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.auth = action.payload;
        });
    },
});

const { actions, reducer: authReducer } = slice;


const authAction = {
    ...actions,
    getAll
};

export {authReducer, authAction}