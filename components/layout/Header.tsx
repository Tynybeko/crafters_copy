'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";

import ForgotPassword from '../auth/ForgotPaswword';
import { MobileMenu } from "../mobile-menu";
import Login from '../auth/Login';
import Register from '../auth/Register';
import { HeaderItem } from "@/components/layout/HeaderItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser } from "@/redux/slices/user";
import Catalog from "../catalog/Catalog";

//styles
import '../../styles/header.css';
import Auth from "@/components/auth/Auth";




const Header = () => {
    const dispatch = useAppDispatch();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenCatalog, setIsOpenCatalog] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isOpenDrop, setIsOpenDrop] = useState(false);
    let timer: any;
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { isAuth: isAuthUser } = useAppSelector(state => state.user);


    useEffect(() => { dispatch(fetchUser()) }, []);


    const closeCatalog = () => setIsOpenCatalog(false);
    const handleButtonClick = () => setIsOpenDrop(!isOpenDrop);

    const handleMouseEnter = () => {
        clearTimeout(timer);
        setIsOpenDrop(true);
    };

    const handleMouseLeave = () => {
        timer = setTimeout(() => {
            setIsOpenDrop(false);
        }, 150);
    };

    useEffect(() => {
        function handleClick(event: any) {
            if (!event.target.closest('.header')) {
                setIsOpenMenu(prev => !prev);
            }
        }
        if (isOpenMenu) {
            document.addEventListener('click', handleClick);
            closeCatalog();
        }
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isOpenMenu]);

    return (
        <>
            <MobileMenu setIsLogin={setIsLogin} isAuthUser={isAuthUser} setIsOpenCatalog={setIsOpenCatalog}
                close={() => setIsOpenMenu(false)} open={isOpenMenu} />
            <Catalog setIsOpenMenu={setIsOpenMenu} setIsOpenCatalog={setIsOpenCatalog}
                isOpenCatalog={isOpenCatalog} />
            <Auth isLogin={isLogin} setIsLogin={setIsLogin} />
            <header className='header'>
                <HeaderTop />
                <div className='globalContainer'>
                    <div className='header-item'>
                        <HeaderItem
                            onClick={() => {
                                setIsOpenMenu(!isOpenMenu);
                                closeCatalog();
                            }}
                            openMenu={isOpenMenu}
                            openCatalog={isOpenCatalog}
                            dropdownRef={dropdownRef}
                            onClick1={handleButtonClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            openDrop={isOpenDrop}
                            isAuthUser={isAuthUser}
                            onClick2={() => setIsLogin(prev => !prev)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;


function HeaderTop() {
    return (
        <div className="decor">
            <div className="globalContainer">
                <div className="decor-header">
                    <div className="phone">
                        <p>+ 000 000 00 00</p>
                        <p>+ 000 000 00 00</p>
                    </div>
                    <ul className="lists">
                        <li><Link href={"/discount"}>Discount</Link></li>
                        <li><Link href={"/payment"}>Payment</Link></li>
                        <li><Link href={"/delivery"}>Delivery</Link></li>
                        <li><Link href={"/contact"}>Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}