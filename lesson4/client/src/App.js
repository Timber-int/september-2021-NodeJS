import { RegistrationForm, User } from './components';
import { useState } from 'react';
import { userService } from './service';

const App = () => {

    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    const getUserByEmail = () => {
        userService.getByEmail(email)
            .then(value => setUser(value.data));
        setEmail('');
    };

    return (
        <div>
            <RegistrationForm/>
            <hr/>
            <div>
                <div>
                    User by Email
                </div>
                <input type="text" value={email} placeholder={'email'} onChange={e => setEmail(e.target.value)}/>
                <input type="submit" value={'ByEmail'} onClick={getUserByEmail}/>
            </div>
            <hr/>
            <div>
                {user && <User user={user}/>}
            </div>
        </div>
    );
};

export { App };
