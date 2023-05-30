import React from 'react';
import {Layout} from "./layouts/Layout";
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/mainPage";
import {MovieDetail} from "./components/Movies/MovieDetail/MovieDetail";


const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={':id'} element={<MovieDetail/>}/>
            </Route>
        </Routes>
    )
};

export default App;