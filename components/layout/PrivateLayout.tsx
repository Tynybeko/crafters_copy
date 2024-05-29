'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { setToastiState } from '@/redux/slices/toastiSlice';


function PrivateLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch()
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            router.push('/');
            dispatch(setToastiState([{ type: 'error', data: 'Авторизируйтесь пожалуйста!' }]))
        }
    }, [router]);

    return (
        <>
            {children}
        </>
    )


}

export default PrivateLayout;