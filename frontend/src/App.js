import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { userBodyForRegistrationValidator } from './validatior';
import { authService } from './service';

const App = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(userBodyForRegistrationValidator),
        mode: 'onTouched'
    });

    const submit = async (user) => {
        await authService.registration(user);
        reset();
    };

    return (
        <div>
            <div>
                <div>Registration Form</div>
                <form onSubmit={handleSubmit(submit)}>
                    <div><label>FirstName: <input type="text" {...register('firstName')} placeholder={'firstName'}/></label></div>
                    {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName.message}</span>}
                    <div><label>LastName: <input type="text" {...register('lastName')} placeholder={'lastName'}/></label></div>
                    {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName.message}</span>}
                    <div><label>Age: <input type="number" {...register('age')} placeholder={'age'}/></label></div>
                    {errors.age && <span style={{ color: 'red' }}>{errors.age.message}</span>}
                    <div><label>Email: <input type="text" {...register('email')} placeholder={'email'}/></label></div>
                    {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
                    <div><label>Password: <input type="password" {...register('password')} placeholder={'password'}/></label></div>
                    {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                    <div><label>City: <input type="text" {...register('city')} placeholder={'city'}/></label></div>
                    {errors.city && <span style={{ color: 'red' }}>{errors.city.message}</span>}
                    <div><label><input type="submit" value={'Register'}/></label></div>
                </form>
            </div>
        </div>
    );
};

export { App };
