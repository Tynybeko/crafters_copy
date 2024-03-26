'use client';

import React, { useEffect } from 'react';


import UserData from '@/app/personal-cabinet/user-data/page';
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { fetchCompany } from "@/redux/slices/company";

function PersonalCabinet() {
    const router = useRouter();
  
    
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, [router]);
    return  <UserData />
}

export default PersonalCabinet;