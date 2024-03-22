'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from "next/link";

import { useScreenWidth } from '@/lib/hooks';
import ForgotPassword from '../auth/ForgotPaswword';
import { MobileMenu } from "../mobile-menu";
import Catalog from "@/components/header/(components)/catalog";
import Login from '../auth/Login';
import Register from '../auth/Register';

//styles
import './header.css';
import { HeaderItem } from "@/components/header/(components)/HeaderItem";

const Header = () => {
    const { screenWidth } = useScreenWidth();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenCatalog, setIsOpenCatalog] = useState(false);
    const [isAuth, setIsAuth] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isOpenDrop, setIsOpenDrop] = useState(false);
    let timer: any;
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    const closeCatalog = () => {
        setIsOpenCatalog(false);
    };
    
    const handleClickOutside = (event: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpenDrop(false);
        }
    };
    
    const handleButtonClick = () => {
        setIsOpenDrop(!isOpenDrop);
    };
    
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    useEffect(() => {
        if (screenWidth <= 768) {
            setIsOpenMenu(false);
            closeCatalog();
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
            closeCatalog();
        }
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isOpenMenu]);
    
    return (
      <>
          <MobileMenu setIsLogin={setIsLogin} isAuth={isAuth} setIsOpenCatalog={setIsOpenCatalog}
                      close={() => setIsOpenMenu(false)} open={isOpenMenu} />
          <Catalog setIsOpenMenu={setIsOpenMenu} setIsOpenCatalog={setIsOpenCatalog}
                   isOpenCatalog={isOpenCatalog} />
          {isForgotPassword && <ForgotPassword setIsForgotPassword={setIsForgotPassword} setIsRegister={setIsRegister}
                                               setIsLogin={setIsLogin} />}
          {isLogin && <Login setIsForgotPassword={setIsForgotPassword} setIsRegister={setIsRegister}
                             setIsLogin={setIsLogin} />}
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
                              <li><Link href={ '/discount' }>Discount</Link></li>
                              <li><Link href={ '/payment' }>Payment</Link></li>
                              <li><Link href={ '/delivery' }>Delivery</Link></li>
                              <li><Link href={ '/contact' }>Contact</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
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
                        auth={isAuth}
                        onClick2={() => setIsLogin(prev => !prev)}
                      />
                  </div>
              </div>
          </header>
      </>
    );
};

export default Header;
