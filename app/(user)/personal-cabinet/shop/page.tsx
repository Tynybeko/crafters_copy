'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import Box from '@/components/ui/Box';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ICompany } from '@/types';
// styles
import './shop.css';
import Link from "next/link";

const  Shop = () => {
    const { data } = useAppSelector((state) => state.company);
    const [inputData, setInputData] = useState<ICompany | null>(data)

    const [isDisabledCompany, setIsDisabledCompany] = useState<boolean>(false);
    const [isDisabledAddress, setIsDisabledAddress] = useState<boolean>(false);
    const [isDisabledLocation, setIsDisabledLocation] = useState<boolean>(false);

    const handleEdit = (text: string) => {
        setIsDisabledCompany(text === 'company');
        setIsDisabledAddress(text === 'address');
        setIsDisabledLocation(text === 'location');
    }
    useEffect(() => {
        setInputData(data)
    }, [data])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }
    if (!data || Object.keys(data).length === 0) {
        return <div>Data is an empty object</div>;
    }
    
    return (
        <div className='shop'>
            <div className='shop-wrapper'>
                <div className='shop-cards'>
                    <Box className='shop-card'>
                        <div className='shop-card-title'>
                            <div className='shop-card-img'>
                                {data.legal_name}
                            </div>
                            <div className='shop-card-url'>
                                <Link href={data.site_url ? data.site_url : '#'}>{data.site_url}</Link>
                            </div>
                        </div>
                        <div className='shop-card-body'>

                        </div>
                    </Box>
                    <Box className='user'>
                        <div className='user-header'>
                            <div className='user-item'>
                                <div className='user-title'>
                                    <img src="/svg/shop.svg" alt="User" />
                                    Company
                                </div>
                                <Button onClick={() => handleEdit('company')} variant={'ghost'} className='user-edit_btn'>
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
                                </Button>
                            </div>
                        </div>
                        <form className='user-info'>
                            <div className='user-info-item'>
                                <p>Legal name</p>
                                <Input name={'legal_name'} value={inputData?.legal_name} onChange={onInputChange} disabled={!isDisabledCompany} />
                            </div>
                            <div className='user-info-item'>
                                <p>Defendant's Person</p>
                                <Input name={'legal_address'} value={inputData?.user.get_full_name} onChange={onInputChange} disabled={!isDisabledCompany} />
                            </div>
                            <div className='user-info-item'>
                                <p>Address site</p>
                                <Input name={'site_url'} value={inputData?.site_url} onChange={onInputChange} disabled={!isDisabledCompany} />
                            </div>
                        </form>
                        {isDisabledCompany && <Button className='mt-4'>Save</Button>}
                    </Box>
                    <Box className='user'>
                        <div className='user-header'>
                            <div className='user-item'>
                                <div className='user-title'>
                                    <img src="/svg/phone.svg" alt="User" />
                                    Address
                                </div>
                                <Button onClick={() => handleEdit('address')} variant={'ghost'} className='user-edit_btn'>
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
                                </Button>
                            </div>
                        </div>
                        <form className='user-contact'>
                            <div className='user-info-item'>
                                <p>Email</p>
                                <Input name={'legal_name'} value={inputData?.legal_name} onChange={onInputChange} disabled={!isDisabledAddress} />
                            </div>
                            <div className='user-info-item'>
                                <p>Phone</p>
                                <Input name={'legal_address'} value={inputData?.phone} onChange={onInputChange} disabled={!isDisabledAddress} />
                            </div>
                        </form>
                        {isDisabledAddress && <Button className='mt-4'>Save</Button>}
                    </Box>
                    <Box className='user'>
                        <div className='user-header'>
                            <div className='user-item'>
                                <div className='user-title'>
                                    <img src="/svg/location.svg" alt="User" />
                                    Location
                                </div>
                                <Button onClick={() => handleEdit('company')} variant={'ghost'} className='user-edit_btn'>
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
                                </Button>
                            </div>
                        </div>
                        <form className='user-info'>
                            <div className='user-info-item'>
                                <p>Legal addresses</p>
                                <Input name={'legal_name'} value={inputData?.legal_address} onChange={onInputChange} disabled={!isDisabledLocation} />
                            </div>
                            <div className='user-info-item'>
                                <p>City</p>
                                <Input name={'legal_address'} value={inputData?.city ? inputData?.city : ''} onChange={onInputChange} disabled={!isDisabledLocation} />
                            </div>
                            <div className='user-info-item'>
                                <p>Index</p>
                                <Input name={'site_url'} value={inputData?.index} onChange={onInputChange} disabled={!isDisabledLocation} />
                            </div>
                        </form>
                        {isDisabledLocation && <Button className='mt-4'>Save</Button>}
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Shop;