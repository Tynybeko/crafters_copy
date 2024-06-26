'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CustomLink } from "@/components/utils/CustomLink";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LogoutUser } from "@/redux/slices/user";
import { fetchCompany } from "@/redux/slices/company";


//styles
import '../personal-cabinet.css'
import { fetchFavorites } from "@/redux/slices/favorites";

export function PersonalSidebar() {
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const router = useRouter();
    const { data } = useAppSelector(state => state.user)
    const favorites = useAppSelector(state => state.favorites.data)
    const handleLogout = () => {
        dispatch(LogoutUser())
        window.location.href = '/'
    }
    const [state, setState] = useState(false)
    useEffect(() => {
        if (data && data?.role !== 'client') {
            dispatch(fetchCompany());
        }
    }, [dispatch, data]);

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch]);

    return (
        <>
            <aside className="cabinet-sidebar">
                <nav>
                    <ul>
                        <li>
                            <div className={'flex items-center justify-between'}>
                                <CustomLink href="/personal-cabinet" active={pathName === "/personal-cabinet"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.5 16.6667C4.44649 14.6021 7.08918 13.3333 10 13.3333C12.9108 13.3333 15.5535 14.6021 17.5 16.6667M13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92893 10 6.25 8.32107 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25Z"
                                            stroke="#262D2999" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    User data
                                </CustomLink>
                            </div>

                            <div className={'flex items-center justify-between'}>
                                <CustomLink href="/personal-cabinet/message"
                                    active={pathName === "/personal-cabinet/message"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.83333 7.08333H10M5.83333 10H12.5M5.83333 15V16.9463C5.83333 17.3903 5.83333 17.6123 5.92436 17.7263C6.00352 17.8255 6.12356 17.8832 6.25045 17.8831C6.39636 17.8829 6.56973 17.7442 6.91646 17.4668L8.90434 15.8765C9.31043 15.5517 9.51347 15.3892 9.73957 15.2737C9.94017 15.1712 10.1537 15.0963 10.3743 15.051C10.6231 15 10.8831 15 11.4031 15H13.5C14.9001 15 15.6002 15 16.135 14.7275C16.6054 14.4878 16.9878 14.1054 17.2275 13.635C17.5 13.1002 17.5 12.4001 17.5 11V6.5C17.5 5.09987 17.5 4.3998 17.2275 3.86502C16.9878 3.39462 16.6054 3.01217 16.135 2.77248C15.6002 2.5 14.9001 2.5 13.5 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V11.6667C2.5 12.4416 2.5 12.8291 2.58519 13.147C2.81635 14.0098 3.49022 14.6836 4.35295 14.9148C4.67087 15 5.05836 15 5.83333 15Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Message
                                </CustomLink>
                                <span>0</span>
                            </div>
                        </li>
                        <li>
                            <div className={'flex items-center justify-between'}>
                                <Link className={pathName === "/personal-cabinet/favorites" ? "active" : ""}
                                    href={"/personal-cabinet/favorites"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.4272 2.5C16.3624 2.5 18.3346 5.29375 18.3346 7.9C18.3346 13.1781 10.1495 17.5 10.0013 17.5C9.85315 17.5 1.66797 13.1781 1.66797 7.9C1.66797 5.29375 3.64019 2.5 6.57538 2.5C8.26056 2.5 9.36241 3.35312 10.0013 4.10312C10.6402 3.35312 11.742 2.5 13.4272 2.5Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Favorites
                                </Link>
                                <span>{favorites?.length}</span>
                            </div>
                            <div className={'flex items-center justify-between'}>
                                <Link className={pathName === "/personal-cabinet/my-purchases" ? "active" : ""}
                                    href={"/personal-cabinet/my-purchases"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.66797 1.66699H2.75644C2.96145 1.66699 3.06396 1.66699 3.14645 1.70469C3.21915 1.73792 3.28076 1.79135 3.32393 1.85861C3.37291 1.93495 3.38741 2.03643 3.4164 2.23938L3.81083 5.00033M3.81083 5.00033L4.6874 11.4432C4.79864 12.2608 4.85426 12.6696 5.04972 12.9773C5.22195 13.2484 5.46887 13.464 5.76076 13.5981C6.09202 13.7503 6.50459 13.7503 7.32972 13.7503H14.4613C15.2468 13.7503 15.6395 13.7503 15.9604 13.609C16.2434 13.4844 16.4862 13.2835 16.6615 13.0288C16.8604 12.74 16.9339 12.3542 17.0809 11.5826L18.1839 5.79173C18.2356 5.52017 18.2615 5.38438 18.224 5.27824C18.1911 5.18513 18.1262 5.10673 18.0409 5.05701C17.9437 5.00033 17.8054 5.00033 17.529 5.00033H3.81083ZM8.33464 17.5003C8.33464 17.9606 7.96154 18.3337 7.5013 18.3337C7.04106 18.3337 6.66797 17.9606 6.66797 17.5003C6.66797 17.0401 7.04106 16.667 7.5013 16.667C7.96154 16.667 8.33464 17.0401 8.33464 17.5003ZM15.0013 17.5003C15.0013 17.9606 14.6282 18.3337 14.168 18.3337C13.7077 18.3337 13.3346 17.9606 13.3346 17.5003C13.3346 17.0401 13.7077 16.667 14.168 16.667C14.6282 16.667 15.0013 17.0401 15.0013 17.5003Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    My purchases
                                </Link>
                            </div>
                            <div className={'flex items-center justify-between'}>
                                <Link className={pathName === "/personal-cabinet/my-feedback" ? "active" : ""}
                                    href={"/personal-cabinet/my-feedback"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.83464 18.3337V9.16699M1.66797 10.8337V16.667C1.66797 17.5875 2.41416 18.3337 3.33464 18.3337H14.5232C15.7571 18.3337 16.8065 17.4334 16.9941 16.2138L17.8915 10.3805C18.1245 8.86607 16.9528 7.50033 15.4206 7.50033H12.5013C12.0411 7.50033 11.668 7.12723 11.668 6.66699V3.72186C11.668 2.58699 10.748 1.66699 9.6131 1.66699C9.34242 1.66699 9.09712 1.8264 8.98718 2.07376L6.05458 8.67211C5.92083 8.97305 5.6224 9.16699 5.29307 9.16699H3.33464C2.41416 9.16699 1.66797 9.91318 1.66797 10.8337Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    My feedback
                                </Link>
                                <span>0</span>
                            </div>
                        </li>
                        {data?.role !== "client" && (
                            <li>
                                <div className={'flex items-center justify-between'}>
                                    <CustomLink href={"/personal-cabinet/shop"}
                                        active={pathName === "/personal-cabinet/shop"}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.2513 9.16667H3.83464C3.36792 9.16667 3.13457 9.16667 2.95631 9.25749C2.79951 9.33739 2.67202 9.46487 2.59213 9.62167C2.5013 9.79993 2.5013 10.0333 2.5013 10.5V17.5M13.7513 9.16667H16.168C16.6347 9.16667 16.868 9.16667 17.0463 9.25749C17.2031 9.33739 17.3306 9.46487 17.4105 9.62167C17.5013 9.79993 17.5013 10.0333 17.5013 10.5V17.5M13.7513 17.5V5.16667C13.7513 4.23325 13.7513 3.76654 13.5696 3.41002C13.4099 3.09641 13.1549 2.84144 12.8413 2.68166C12.4848 2.5 12.0181 2.5 11.0846 2.5H8.91797C7.98455 2.5 7.51784 2.5 7.16132 2.68166C6.84771 2.84144 6.59275 3.09641 6.43296 3.41002C6.2513 3.76654 6.2513 4.23325 6.2513 5.16667V17.5M18.3346 17.5H1.66797M9.16797 5.83333H10.8346M9.16797 9.16667H10.8346M9.16797 12.5H10.8346"
                                                stroke="#262D2999" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        Shop
                                    </CustomLink>
                                </div>
                                <div className={'flex items-center justify-between'}>
                                    <Link className={pathName === "/personal-cabinet/orders" ? "active" : ""}
                                        href={"/personal-cabinet/orders"}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.8346 5.83333L9.90502 3.9741C9.63747 3.439 9.50369 3.17144 9.30411 2.97597C9.12762 2.80311 8.91491 2.67164 8.68136 2.59109C8.41727 2.5 8.11814 2.5 7.51988 2.5H4.33464C3.40121 2.5 2.9345 2.5 2.57798 2.68166C2.26438 2.84144 2.00941 3.09641 1.84962 3.41002C1.66797 3.76654 1.66797 4.23325 1.66797 5.16667V5.83333M1.66797 5.83333H14.3346C15.7348 5.83333 16.4348 5.83333 16.9696 6.10582C17.44 6.3455 17.8225 6.72795 18.0622 7.19836C18.3346 7.73314 18.3346 8.4332 18.3346 9.83333V13.5C18.3346 14.9001 18.3346 15.6002 18.0622 16.135C17.8225 16.6054 17.44 16.9878 16.9696 17.2275C16.4348 17.5 15.7348 17.5 14.3346 17.5H5.66797C4.26784 17.5 3.56777 17.5 3.03299 17.2275C2.56259 16.9878 2.18014 16.6054 1.94045 16.135C1.66797 15.6002 1.66797 14.9001 1.66797 13.5V5.83333ZM7.5013 11.6667L9.16797 13.3333L12.918 9.58333"
                                                stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        Orders
                                    </Link>
                                </div>
                                <div className={'flex items-center justify-between'}>
                                    <Link className={pathName === "/personal-cabinet/my-products" ? "active" : ""}
                                        href={"/personal-cabinet/my-products"}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17.0833 6.06527L9.99997 10.0005M9.99997 10.0005L2.91664 6.06527M9.99997 10.0005L10 17.9171M11.6667 17.4079L10.6475 17.9741C10.4112 18.1054 10.293 18.171 10.1679 18.1968C10.0571 18.2195 9.94288 18.2195 9.83213 18.1968C9.70698 18.171 9.58881 18.1054 9.35248 17.9741L3.18581 14.5481C2.93621 14.4095 2.8114 14.3401 2.72053 14.2415C2.64013 14.1543 2.57929 14.0509 2.54207 13.9382C2.5 13.8109 2.5 13.6681 2.5 13.3826V6.61835C2.5 6.33281 2.5 6.19005 2.54207 6.06271C2.57929 5.95007 2.64013 5.84667 2.72053 5.75942C2.8114 5.66081 2.93621 5.59148 3.18581 5.45281L9.35248 2.02688C9.58881 1.89558 9.70698 1.82993 9.83213 1.80419C9.94288 1.78141 10.0571 1.78141 10.1679 1.80419C10.293 1.82993 10.4112 1.89558 10.6475 2.02688L16.8142 5.4528C17.0638 5.59147 17.1886 5.66081 17.2795 5.75942C17.3599 5.84666 17.4207 5.95007 17.4579 6.06271C17.5 6.19004 17.5 6.33281 17.5 6.61835L17.5 10.4171M6.25 3.75048L13.75 7.91714M13.3333 15.0005L15 16.6671L18.3333 13.3338"
                                                stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        My products
                                    </Link>
                                </div>
                            </li>
                        )}
                        <li>
                            <div className={'flex items-center justify-between'}>
                                <Link className={pathName === "/personal-cabinet/settings" ? "active" : ""}
                                    href={"/personal-cabinet/settings"}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.83083 16.1419L8.31787 17.2373C8.46265 17.5634 8.69893 17.8404 8.99805 18.0349C9.29718 18.2293 9.64629 18.3327 10.0031 18.3327C10.3598 18.3327 10.7089 18.2293 11.008 18.0349C11.3072 17.8404 11.5435 17.5634 11.6882 17.2373L12.1753 16.1419C12.3486 15.7533 12.6403 15.4292 13.0086 15.216C13.3793 15.0022 13.808 14.9111 14.2336 14.9558L15.4253 15.0827C15.78 15.1202 16.138 15.054 16.4558 14.8921C16.7737 14.7302 17.0378 14.4796 17.216 14.1706C17.3945 13.8619 17.4795 13.5079 17.4608 13.1518C17.4421 12.7956 17.3204 12.4525 17.1105 12.1642L16.4049 11.1947C16.1537 10.847 16.0194 10.4284 16.0216 9.99935C16.0215 9.57151 16.157 9.15464 16.4086 8.80861L17.1142 7.83916C17.3241 7.55081 17.4458 7.20774 17.4645 6.85158C17.4832 6.49541 17.3982 6.14147 17.2197 5.83268C17.0415 5.52371 16.7774 5.27309 16.4595 5.11121C16.1417 4.94932 15.7837 4.88312 15.429 4.92065L14.2373 5.0475C13.8118 5.09219 13.383 5.00112 13.0123 4.78731C12.6432 4.57289 12.3515 4.24715 12.179 3.85676L11.6882 2.76139C11.5435 2.43532 11.3072 2.15828 11.008 1.96385C10.7089 1.76942 10.3598 1.66596 10.0031 1.66602C9.64629 1.66596 9.29718 1.76942 8.99805 1.96385C8.69893 2.15828 8.46265 2.43532 8.31787 2.76139L7.83083 3.85676C7.65827 4.24715 7.36656 4.57289 6.9975 4.78731C6.62684 5.00112 6.19805 5.09219 5.7725 5.0475L4.57713 4.92065C4.2224 4.88312 3.86441 4.94932 3.54655 5.11121C3.2287 5.27309 2.96464 5.52371 2.78638 5.83268C2.6079 6.14147 2.52287 6.49541 2.54161 6.85158C2.56034 7.20774 2.68204 7.55081 2.89194 7.83916L3.5975 8.80861C3.84911 9.15464 3.98461 9.57151 3.98453 9.99935C3.98461 10.4272 3.84911 10.8441 3.5975 11.1901L2.89194 12.1595C2.68204 12.4479 2.56034 12.791 2.54161 13.1471C2.52287 13.5033 2.6079 13.8572 2.78638 14.166C2.96481 14.4748 3.22891 14.7253 3.54672 14.8872C3.86452 15.049 4.22243 15.1153 4.57713 15.0781L5.76879 14.9512C6.19435 14.9065 6.62314 14.9976 6.99379 15.2114C7.36423 15.4252 7.6573 15.751 7.83083 16.1419Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path
                                            d="M10.0016 12.4993C11.3823 12.4993 12.5016 11.3801 12.5016 9.99935C12.5016 8.61864 11.3823 7.49935 10.0016 7.49935C8.62085 7.49935 7.50156 8.61864 7.50156 9.99935C7.50156 11.3801 8.62085 12.4993 10.0016 12.4993Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Settings
                                </Link>
                            </div>
                            {data?.role === 'client' && (
                                <Button onClick={() => router.push('/add-company')} className={'w-full'}>
                                    Opens company
                                </Button>
                            )}
                        </li>

                    </ul>
                    <div className='mt-[20px]'>
                        {/* <Button variant='destructiveOutline' onClick={handleLogout} className={'w-full'}> */}
                        <Button variant='destructiveOutline' onClick={() => setState(prev => !prev)} className={'w-full'}>
                            Get out
                        </Button>
                    </div>
                </nav>
            </aside>
            {
                state
                &&
                <ChekcLogOut setState={setState} handleLogout={handleLogout} />
            }
        </>
    )
}

const ChekcLogOut = ({ setState, handleLogout }: { setState: any, handleLogout: any }) => {
    return (
        <div className=" fixed z-[99] top-[0] left-[0] w-[100%] h-[100%] bg-[rgba(0,_0,_0,_0.8)] flex items-center justify-center" onClick={(e: any) => {
            if (!e.target.closest(`#loggout`)) {
                setState((prev: boolean) => !prev)
            }
        }}>
            <div className="w-[700px] bg-[white] rounded-[32px] px-[32px] py-[40px]" id="loggout">
                <div className="flex items-center justify-between mb-[40px]">
                    <h2 className="text-[#262D29] font-[600] text-[36px] leading-[38px]">Вы действительно хотите выйти</h2>
                    <button onClick={() => setState((prev: boolean) => !prev)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="#F83427" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex gap-[12px]">
                    <button className="text-[#FFFFFF] font-[400] text-[16px] leading-[18px] bg-[#F83427] rounded-[32px] w-[100%] py-[12px]" onClick={(e: any) => {
                        handleLogout(e)
                        setState((prev: boolean) => !prev)
                    }}>yes</button>
                    <button className="text-[#FFFFFF] font-[400] text-[16px] leading-[18px] bg-[#1DBE60] rounded-[32px] w-[100%] py-[12px]" onClick={() => setState((prev: boolean) => !prev)}>no</button>
                </div>
            </div>
        </div>
    )
}