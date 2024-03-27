'use client'

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { CustomLink } from "@/components/utils/CustomLink";
import { useAppDispatch } from "@/redux/hooks";
import { LogoutUser } from "@/redux/slices/user";

interface IMobileMenuProps {
    open: boolean;
    setIsOpenCatalog: any
    isAuthUser: any
    setIsLogin: any
    close: any
}


export function MobileMenu({ close, setIsLogin, isAuthUser, open, setIsOpenCatalog }: IMobileMenuProps) {
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        setIsLogin(false);
        close((prev: any) => !prev)
        dispatch(LogoutUser())
    };

    const pathName = usePathname()
    return (
        <div className={open ? 'mobile-menu active' : 'mobile-menu'}>
            <Button size='full' onClick={() => setIsOpenCatalog((prev: any) => !prev)}
                className='w-full flex items-center justify-center gap-1'>
                catalog
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 12L10.5 8L6.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </Button>
            <div className='py-[20px] px-[18px] flex flex-col gap-[12px]'>
                {isAuthUser && <>
                    <ul className='mobile-lists'>
                        <li>
                            <CustomLink active={pathName === '/personal-cabinet'} href='/personal-cabinet'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.5 16.6667C4.44649 14.6021 7.08918 13.3333 10 13.3333C12.9108 13.3333 15.5535 14.6021 17.5 16.6667M13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92893 10 6.25 8.32107 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25Z"
                                        stroke="#262D2999" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                User data
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink active={pathName === '/personal-cabinet/company'}
                                href={'/personal-cabinet/company'}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.24935 9.16667H3.83268C3.36597 9.16667 3.13262 9.16667 2.95436 9.25749C2.79756 9.33739 2.67007 9.46487 2.59018 9.62167C2.49935 9.79993 2.49935 10.0333 2.49935 10.5V17.5M13.7493 9.16667H16.166C16.6327 9.16667 16.8661 9.16667 17.0443 9.25749C17.2011 9.33739 17.3286 9.46487 17.4085 9.62167C17.4993 9.79993 17.4993 10.0333 17.4993 10.5V17.5M13.7493 17.5V5.16667C13.7493 4.23325 13.7493 3.76654 13.5677 3.41002C13.4079 3.09641 13.1529 2.84144 12.8393 2.68166C12.4828 2.5 12.0161 2.5 11.0827 2.5H8.91602C7.98259 2.5 7.51588 2.5 7.15937 2.68166C6.84576 2.84144 6.59079 3.09641 6.43101 3.41002C6.24935 3.76654 6.24935 4.23325 6.24935 5.16667V17.5M18.3327 17.5H1.66602M9.16602 5.83333H10.8327M9.16602 9.16667H10.8327M9.16602 12.5H10.8327"
                                        stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                                Company
                            </CustomLink>
                        </li>
                    </ul>
                    <div className='w-full h-[1px] bg-[#262D2933]' />
                    <div>
                        <ul className='mobile-lists'>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/favorites'}
                                    href={'/personal-cabinet/favorites'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.4253 2.5C16.3605 2.5 18.3327 5.29375 18.3327 7.9C18.3327 13.1781 10.1475 17.5 9.99935 17.5C9.8512 17.5 1.66602 13.1781 1.66602 7.9C1.66602 5.29375 3.63824 2.5 6.57342 2.5C8.25861 2.5 9.36046 3.35312 9.99935 4.10312C10.6382 3.35312 11.7401 2.5 13.4253 2.5Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Favorites
                                </CustomLink>

                            </li>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/my-purchases'}
                                    href={'/personal-cabinet/my-purchases'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.66602 1.6665H2.75449C2.9595 1.6665 3.06201 1.6665 3.1445 1.7042C3.2172 1.73743 3.2788 1.79086 3.32197 1.85813C3.37096 1.93446 3.38546 2.03594 3.41445 2.23889L3.80887 4.99984M3.80887 4.99984L4.68545 11.4427C4.79669 12.2603 4.85231 12.6691 5.04777 12.9768C5.22 13.2479 5.46692 13.4635 5.75881 13.5976C6.09007 13.7498 6.50264 13.7498 7.32777 13.7498H14.4593C15.2448 13.7498 15.6375 13.7498 15.9585 13.6085C16.2415 13.4839 16.4842 13.283 16.6596 13.0284C16.8585 12.7395 16.9319 12.3537 17.0789 11.5821L18.1819 5.79125C18.2337 5.51968 18.2595 5.38389 18.222 5.27775C18.1892 5.18465 18.1243 5.10624 18.039 5.05652C17.9417 4.99984 17.8035 4.99984 17.527 4.99984H3.80887ZM8.33268 17.4998C8.33268 17.9601 7.95959 18.3332 7.49935 18.3332C7.03911 18.3332 6.66602 17.9601 6.66602 17.4998C6.66602 17.0396 7.03911 16.6665 7.49935 16.6665C7.95959 16.6665 8.33268 17.0396 8.33268 17.4998ZM14.9993 17.4998C14.9993 17.9601 14.6263 18.3332 14.166 18.3332C13.7058 18.3332 13.3327 17.9601 13.3327 17.4998C13.3327 17.0396 13.7058 16.6665 14.166 16.6665C14.6263 16.6665 14.9993 17.0396 14.9993 17.4998Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    My purchases
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/my-feedback'}
                                    href={'/personal-cabinet/my-feedback'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.83268 18.3332V9.1665M1.66602 10.8332V16.6665C1.66602 17.587 2.41221 18.3332 3.33268 18.3332H14.5212C15.7551 18.3332 16.8045 17.4329 16.9921 16.2133L17.8896 10.38C18.1226 8.86558 16.9509 7.49984 15.4187 7.49984H12.4993C12.0391 7.49984 11.666 7.12674 11.666 6.6665V3.72137C11.666 2.5865 10.746 1.6665 9.61115 1.6665C9.34046 1.6665 9.09517 1.82592 8.98523 2.07327L6.05263 8.67162C5.91888 8.97256 5.62045 9.1665 5.29112 9.1665H3.33268C2.41221 9.1665 1.66602 9.9127 1.66602 10.8332Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    My feedback
                                </CustomLink>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full h-[1px] bg-[#262D2933]' />
                    <div>
                        <ul className='mobile-lists'>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/orders'}
                                    href={'/personal-cabinet/orders'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.8327 5.83333L9.90306 3.9741C9.63552 3.439 9.50174 3.17144 9.30216 2.97597C9.12567 2.80311 8.91295 2.67164 8.67941 2.59109C8.41532 2.5 8.11619 2.5 7.51793 2.5H4.33268C3.39926 2.5 2.93255 2.5 2.57603 2.68166C2.26243 2.84144 2.00746 3.09641 1.84767 3.41002C1.66602 3.76654 1.66602 4.23325 1.66602 5.16667V5.83333M1.66602 5.83333H14.3327C15.7328 5.83333 16.4329 5.83333 16.9677 6.10582C17.4381 6.3455 17.8205 6.72795 18.0602 7.19836C18.3327 7.73314 18.3327 8.4332 18.3327 9.83333V13.5C18.3327 14.9001 18.3327 15.6002 18.0602 16.135C17.8205 16.6054 17.4381 16.9878 16.9677 17.2275C16.4329 17.5 15.7328 17.5 14.3327 17.5H5.66602C4.26588 17.5 3.56582 17.5 3.03104 17.2275C2.56063 16.9878 2.17818 16.6054 1.9385 16.135C1.66602 15.6002 1.66602 14.9001 1.66602 13.5V5.83333ZM7.49935 11.6667L9.16602 13.3333L12.916 9.58333"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Orders
                                </CustomLink>
                            </li>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/my-products'}
                                    href={'/personal-cabinet/my-products'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.0833 6.06478L9.99997 9.99996M9.99997 9.99996L2.91664 6.06478M9.99997 9.99996L10 17.9167M11.6667 17.4074L10.6475 17.9736C10.4112 18.1049 10.293 18.1705 10.1679 18.1963C10.0571 18.2191 9.94288 18.2191 9.83213 18.1963C9.70698 18.1705 9.58881 18.1049 9.35248 17.9736L3.18581 14.5477C2.93621 14.409 2.8114 14.3397 2.72053 14.241C2.64013 14.1538 2.57929 14.0504 2.54207 13.9378C2.5 13.8104 2.5 13.6677 2.5 13.3821V6.61786C2.5 6.33233 2.5 6.18956 2.54207 6.06223C2.57929 5.94958 2.64013 5.84618 2.72053 5.75894C2.8114 5.66032 2.93621 5.59099 3.18581 5.45232L9.35248 2.02639C9.58881 1.8951 9.70698 1.82944 9.83213 1.80371C9.94288 1.78093 10.0571 1.78093 10.1679 1.80371C10.293 1.82944 10.4112 1.89509 10.6475 2.02639L16.8142 5.45232C17.0638 5.59099 17.1886 5.66032 17.2795 5.75893C17.3599 5.84618 17.4207 5.94958 17.4579 6.06222C17.5 6.18956 17.5 6.33232 17.5 6.61786L17.5 10.4167M6.25 3.74999L13.75 7.91665M13.3333 15L15 16.6667L18.3333 13.3333"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    My products
                                </CustomLink>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full h-[1px] bg-[#262D2933]' />
                    <div className='my-2'>
                        <ul className='mobile-lists'>
                            <li>
                                <CustomLink active={pathName === '/personal-cabinet/settings'}
                                    href={'/personal-cabinet/settings'}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7.82888 16.1424L8.31591 17.2378C8.4607 17.5639 8.69698 17.8409 8.9961 18.0353C9.29522 18.2298 9.64434 18.3332 10.0011 18.3332C10.3579 18.3332 10.707 18.2298 11.0061 18.0353C11.3052 17.8409 11.5415 17.5639 11.6863 17.2378L12.1733 16.1424C12.3467 15.7538 12.6383 15.4297 13.0067 15.2165C13.3773 15.0027 13.8061 14.9116 14.2317 14.9563L15.4233 15.0832C15.778 15.1207 16.136 15.0545 16.4539 14.8926C16.7717 14.7307 17.0358 14.4801 17.2141 14.1711C17.3925 13.8623 17.4776 13.5084 17.4588 13.1522C17.4401 12.7961 17.3184 12.453 17.1085 12.1647L16.403 11.1952C16.1517 10.8474 16.0175 10.4289 16.0196 9.99984C16.0195 9.57199 16.155 9.15513 16.4067 8.8091L17.1122 7.83965C17.3221 7.5513 17.4438 7.20823 17.4625 6.85207C17.4813 6.4959 17.3962 6.14195 17.2178 5.83317C17.0395 5.5242 16.7754 5.27358 16.4576 5.11169C16.1397 4.94981 15.7817 4.88361 15.427 4.92113L14.2354 5.04799C13.8098 5.09268 13.381 5.00161 13.0104 4.7878C12.6413 4.57338 12.3496 4.24764 12.177 3.85725L11.6863 2.76187C11.5415 2.43581 11.3052 2.15877 11.0061 1.96434C10.707 1.76991 10.3579 1.66645 10.0011 1.6665C9.64434 1.66645 9.29522 1.76991 8.9961 1.96434C8.69698 2.15877 8.4607 2.43581 8.31591 2.76187L7.82888 3.85725C7.65632 4.24764 7.3646 4.57338 6.99554 4.7878C6.62489 5.00161 6.1961 5.09268 5.77054 5.04799L4.57517 4.92113C4.22045 4.88361 3.86246 4.94981 3.5446 5.11169C3.22675 5.27358 2.96269 5.5242 2.78443 5.83317C2.60595 6.14195 2.52092 6.4959 2.53965 6.85207C2.55839 7.20823 2.68009 7.5513 2.88999 7.83965L3.59554 8.8091C3.84716 9.15513 3.98266 9.57199 3.98258 9.99984C3.98266 10.4277 3.84716 10.8445 3.59554 11.1906L2.88999 12.16C2.68009 12.4484 2.55839 12.7914 2.53965 13.1476C2.52092 13.5038 2.60595 13.8577 2.78443 14.1665C2.96286 14.4753 3.22696 14.7258 3.54476 14.8877C3.86257 15.0495 4.22047 15.1158 4.57517 15.0785L5.76684 14.9517C6.1924 14.907 6.62119 14.9981 6.99184 15.2119C7.36228 15.4257 7.65535 15.7515 7.82888 16.1424Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path
                                            d="M9.99961 12.4998C11.3803 12.4998 12.4996 11.3805 12.4996 9.99984C12.4996 8.61913 11.3803 7.49984 9.99961 7.49984C8.6189 7.49984 7.49961 8.61913 7.49961 9.99984C7.49961 11.3805 8.6189 12.4998 9.99961 12.4998Z"
                                            stroke="#262D29" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                    Settings
                                </CustomLink>
                            </li>
                        </ul>
                    </div>
                </>}
                {isAuthUser ? (
                    <Button onClick={handleLogout} variant={'destructiveOutline'}>
                        Get out
                    </Button>
                ) : (
                    <Button onClick={() => {
                        setIsLogin(true);
                        close((prev: any) => !prev)
                    }}>
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
}

