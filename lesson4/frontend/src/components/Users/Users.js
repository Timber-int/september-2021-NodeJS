import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../User/User';
import { getAllUsers } from '../../redux';
import { CONSTANTS } from '../../constants';

const Users = () => {

    const dispatch = useDispatch();

    const {
        error,
        status,
        users
    } = useSelector(state => state['userReducer']);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div>
            {status === CONSTANTS.LOADING && <div className="movies_list-loading">Loading</div>}
            {error && <center><h1>{error}</h1></center>}
            {
                users.map((user, index) => <User key={user.id} user={user} index={index}/>)
            }
        </div>
    );
};

export { Users };
