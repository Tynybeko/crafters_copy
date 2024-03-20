'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputSearch } from "@/components/ui/input";
import { MobileMenu } from "./(components)/mobile-menu";
import { Button } from "@/components/ui/button";
import Catalog from "@/components/header/(components)/catalog";
import Login from '../auth/Login';
import Register from '../auth/Register';

import './header.css';
import { useScreenWidth } from '@/lib/hooks';
import ForgotPassword from '../auth/ForgotPaswword';

const Header = () => {
    const { screenWidth } = useScreenWidth()
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenCatalog, setIsOpenCatalog] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    useEffect(() => {
        if (screenWidth <= 768) {
            setIsOpenMenu(false)
            setIsOpenCatalog(false)
        }
    }, [screenWidth]);


    useEffect(() => {
        function handleClick(event: any) {
            if (!event.target.closest('.header')) {
                setIsOpenMenu(prev => !prev);
            }
        }
        if (isOpenMenu) {
            document.addEventListener('click', handleClick);
            setIsOpenCatalog(false)
        }
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isOpenMenu]);

    return (
        <>
            <MobileMenu setIsLogin={setIsLogin} isAuth={isAuth} setIsOpenCatalog={setIsOpenCatalog} close={() => setIsOpenMenu(false)} open={isOpenMenu} />
            <Catalog setIsOpenMenu={setIsOpenMenu} setIsOpenCatalog={setIsOpenCatalog} isOpenCatalog={isOpenCatalog} />
            {isForgotPassword && <ForgotPassword setIsForgotPassword={setIsForgotPassword} setisRegister={setIsRegister} setIsLogin={setIsLogin} />}
            {isLogin && <Login setIsForgotPassword={setIsForgotPassword} setisRegister={setIsRegister} setIsLogin={setIsLogin} />}
            {isRegister && <Register setisRegister={setIsRegister} setIsLogin={setIsLogin} />}
            <header className='header'>
                <div className='decor'>
                    <div className='globalContainer'>
                        <div className='decor-header'>
                            <div className='phone'>
                                <p>+ 000 000 00 00</p>
                                <p>+ 000 000 00 00</p>
                            </div>
                            <ul className='lists'>
                                <li><Link href='/discount'>Discount</Link></li>
                                <li><Link href='/payment'>Payment</Link></li>
                                <li><Link href='/delivery'>Delivery</Link></li>
                                <li><Link href='/contact'>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='globalContainer'>
                    <div className='header-item'>
                        <div className='header-logo'>
                            <button onClick={() => setIsOpenMenu(!isOpenMenu)} className='w-max burger-menu'>
                                <img src="/svg/burger-menu.svg" alt="Logo" />
                            </button>
                            <Link className='logo' href='/'>
                                <img src="/logo.svg" alt="Logo" />
                            </Link>
                            <div className='header-catalog max-w-[135px] w-full '>
                                <Button
                                    onMouseEnter={() => setIsOpenCatalog(true)}
                                    className='w-full px-0 flex items-center justify-center gap-1'>
                                    catalog
                                    <svg
                                        style={{
                                            rotate: isOpenCatalog ? '180deg' : '360deg',
                                            transition: 'all .3 ease'
                                        }}
                                        width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 12L10.5 8L6.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className='max-w-[605px] w-full header-search'>
                            <InputSearch>
                                <span className='opacity-10'>|</span>
                                <img src="/svg/search-green.svg" alt="Search" />
                            </InputSearch>
                        </div>
                        <div className='max-w-max w-full header-lang'>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ru" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="apple">En</SelectItem>
                                        <SelectItem value="banana">Uzb</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='header-icons'>
                            {isAuth ? (
                                <div className='flex items-center gap-2 h-[20px]'>
                                    <img src="/svg/user.svg" alt="User" />
                                    Profile
                                </div>
                            ) : (
                                <Button onClick={() => setIsLogin(prev => !prev)} className='w-[77px] shadow-custom'>Sign in</Button>
                            )}
                            <span></span>
                            <div className='w-[20px] h-[20px]'>
                                <img src="/svg/heart.svg" alt="Heart" />
                            </div>
                            <span></span>
                            <div className='w-[20px] h-[20px]'>
                                <img src="/svg/shopping-bag.svg" alt="Heart" />
                            </div>
                        </div>
                        <div className='header-icons-mobil'>
                            <div className='w-[28px] h-[28px]'>
                                <img src="/svg/search-black.svg" alt="Heart" />
                            </div>
                            <span></span>
                            <div className='w-[28px] h-[28px]'>
                                <img className='w-full' src="/svg/shopping-bag.svg" alt="Heart" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
