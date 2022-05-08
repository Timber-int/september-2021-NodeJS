import React from 'react';
import { Outlet } from 'react-router-dom';
import { Users } from '../../components';

const UserPage = () => {
    return (
        <div>
            <Users/>
            <hr/>
            <Outlet/>
        </div>
    );
};

export { UserPage };
