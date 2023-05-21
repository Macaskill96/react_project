import React, {FC, useContext} from 'react';
import './Header.css'
import {Logo} from "../Logo";
import {Movies} from "../Movies";
import {ThemeContext} from "../../layouts/Layout";
import ReactSwitch from "react-switch";
import {useNavigate} from "react-router-dom";
import {UserMe} from "../userInfo/User";


const Header:FC = () => {
    const navigate = useNavigate();
    const context = useContext(ThemeContext);


    if (!context) {
        return null
    }
    const {theme, toggleTheme} = context;

    const home =() => {

        navigate('/')
    }
    return (
        <div className={`mainHeader ${theme}`} >
            <div className={'divLogo'} onClick={home}><Logo/></div>
            <div className={'divMovies'}><Movies/></div>
            <div className={'switch'}>
                <label>{theme === 'light' ? 'Light Mode' : 'Night Mode'}</label>
                <ReactSwitch checked={theme === 'dark'} onChange={toggleTheme} className={'swicher'}/>
            </div>
            <div className={'user'}>
                <UserMe/>
            </div>
        </div>
    );
};

export {Header};