"use client";
import React, { type ChangeEvent, useEffect, useState } from "react";


import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser } from "@/redux/slices/user";
import { apiToken } from "@/axios";
import { setToastiState } from "@/redux/slices/toastiSlice";

const UserData = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.user);
    const [isDisabledUserData, setIsDisabledUserData] = useState<boolean>(false);
    const [isDisabledPassword, setIsDisabledPassword] = useState<boolean>(false);
    const [isDisabledContact, setIsDisabledContact] = useState<boolean>(false);
    const [userDataState, setUserDataState] = useState<any>(data);
    const [error, setError] = useState<any>({});
    const [userPassword, setUserPassword] = useState<any>({
        old_password: '',
        password: '',
        password_confirm: ''
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDataState((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }
    const onEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiToken.patch('/accounts/profile/', userDataState)
            .then(() => {
                dispatch(fetchUser());
                handleEdit('');
                dispatch(setToastiState([{ type: 'succes', data: 'Успешно!' }]))
                setError({});
            })
            .catch((error) => {
                setError(error?.response?.data);
            })
    }

    useEffect(() => {
        setUserDataState(data);
    }, [data]);

    const handleEdit = (text: string) => {
        setIsDisabledUserData(text === 'name');
        setIsDisabledPassword(text === 'password');
        setIsDisabledContact(text === 'contact');
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserPassword((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    const onPasswordEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiToken.post('/accounts/change-password/', userPassword)
            .then(() => {
                handleEdit('');
                setError({});
                setUserPassword({
                    old_password: '',
                    password: '',
                    password_confirm: ''
                })
            })
            .catch((error) => {
                setError(error?.response?.data);
            })
    }


    return (
        <div className='personal-cabinet'>
            <Box className='user'>
                <div className='user-header'>
                    <div className='user-item'>
                        <div className='user-title'>
                            <img src="/svg/user.svg" alt="User" />
                            User data
                        </div>
                        {!isDisabledUserData && <Button onClick={() => handleEdit('name')} variant={'ghost'} className='user-edit_btn'>
                            <span>Edit</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_4107_12207)">
                                    <path
                                        d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                        stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4107_12207">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Button>}
                    </div>
                </div>
                <form className='user-info'>
                    <div className='user-info-item'>
                        <p>First name</p>
                        <Input name={'first_name'} onChange={onInputChange} value={userDataState?.first_name} disabled={!isDisabledUserData} />
                    </div>
                    <div className='user-info-item'>
                        <p>Surname</p>
                        <Input name={'last_name'} onChange={onInputChange} value={userDataState?.last_name} disabled={!isDisabledUserData} />
                    </div>
                    <div className='user-info-item'>
                        <p>By middle name</p>
                        <Input name={'middle_name'} onChange={onInputChange} value={userDataState?.middle_name} disabled={!isDisabledUserData} />
                    </div>
                </form>
                {isDisabledUserData && <Button onClick={onEdit} className='mt-4'>Save</Button>}
            </Box>
            <Box className='user'>
                <div className='user-header'>
                    <div className='user-item'>
                        <div className='user-title'>
                            <img src="/svg/phone.svg" alt="User" />
                            Contact
                        </div>
                        {!isDisabledContact && <Button onClick={() => handleEdit('contact')} variant={'ghost'} className='user-edit_btn'>
                            <span>Edit</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_4107_12207)">
                                    <path
                                        d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                        stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4107_12207">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Button>}
                    </div>
                </div>
                <form className='user-contact'>
                    <div className='user-info-item'>
                        <p>Email</p>
                        <Input name={'email'} value={userDataState?.email} disabled />
                    </div>
                    <div className='user-info-item'>
                        <p>Phone</p>
                        <Input name={'phone'} onChange={onInputChange} value={userDataState?.phone || ''} disabled={!isDisabledContact} />
                        <p>{error?.phone ? error.phone : ''}</p>
                    </div>
                    <input type="hidden" name="username" value={userDataState?.username || ''} />
                </form>
                {isDisabledContact && <Button onClick={onEdit} className='mt-4'>Save</Button>}
            </Box>
            <Box className='user'>
                <div className='user-header'>
                    <div className='user-item'>
                        <div className='user-title'>
                            <img src="/svg/key.svg" alt="User" />
                            Password
                        </div>
                        {!isDisabledPassword && <Button onClick={() => handleEdit('password')} variant={'ghost'} className='user-edit_btn'>
                            <span>Edit</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_4107_12207)">
                                    <path
                                        d="M7.33203 2.66714H4.53203C3.41193 2.66714 2.85187 2.66714 2.42405 2.88513C2.04773 3.07688 1.74176 3.38284 1.55002 3.75916C1.33203 4.18699 1.33203 4.74704 1.33203 5.86714V11.4671C1.33203 12.5872 1.33203 13.1473 1.55002 13.5751C1.74176 13.9514 2.04773 14.2574 2.42405 14.4492C2.85187 14.6671 3.41193 14.6671 4.53203 14.6671H10.132C11.2521 14.6671 11.8122 14.6671 12.24 14.4492C12.6163 14.2574 12.9223 13.9514 13.114 13.5751C13.332 13.1473 13.332 12.5872 13.332 11.4671V8.66714M5.33201 10.6671H6.44838C6.7745 10.6671 6.93756 10.6671 7.09101 10.6303C7.22706 10.5976 7.35711 10.5438 7.47641 10.4707C7.61097 10.3882 7.72627 10.2729 7.95687 10.0423L14.332 3.66714C14.8843 3.11486 14.8843 2.21943 14.332 1.66714C13.7797 1.11486 12.8843 1.11486 12.332 1.66714L5.95685 8.04231C5.72625 8.27291 5.61095 8.38821 5.52849 8.52276C5.45539 8.64206 5.40152 8.77212 5.36885 8.90817C5.33201 9.06162 5.33201 9.22468 5.33201 9.5508V10.6671Z"
                                        stroke="#262D2966" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4107_12207">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </Button>}
                    </div>
                </div>
                <form className='user-contact'>
                    <div className='user-info-item'>
                        <p>Old Password</p>
                        <Input name={'old_password'} onChange={onPasswordChange} type={'password'} value={userPassword.old_password} disabled={!isDisabledPassword} />
                        <span className={'error'}>{error && error.old_password ? error.old_password[0] : ''}</span>
                    </div>
                    <div className='user-info-item'>
                        <p>Password</p>
                        <Input name={'password'} onChange={onPasswordChange} type={'password'} value={userPassword.password} disabled={!isDisabledPassword} />
                        <span className={'error'}>{error && error.password ? error.password[0] : ''}</span>
                    </div>
                    <div className='user-info-item'>
                        <p>Password confirm</p>
                        <Input name={'password_confirm'} onChange={onPasswordChange} type={'password'} value={userPassword.password_confirm} disabled={!isDisabledPassword} />
                        <span className={'error'}>{error && error.password_confirm ? error.password_confirm[0] : ''}</span>
                    </div>
                </form>
                {isDisabledPassword && <Button onClick={onPasswordEdit} className='mt-4'>Save</Button>}
            </Box>
        </div>
    );
}

export default UserData;