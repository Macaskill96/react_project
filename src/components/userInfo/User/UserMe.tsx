import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { authAction } from '../../../redux';
import './UserMe.css'

const UserMe: FC = () => {
    const { auth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authAction.getAll());
    }, [dispatch]);


    return (
        <div className={'userInfo'}>
            {auth.username}
            <img src={'images/png-transparent-avatar-male-man-portrait-avatars-xmas-giveaway-icon-thumbnail.png'} alt={'avatar'} className={'avatar'}/>
        </div>
    );
};

export { UserMe };
