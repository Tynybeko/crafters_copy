import React from "react";
import Link from "next/link";
import { CatalogItems } from "@/app/catalogs/(components)/catalog-items";
import { InputSearch } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface HeaderItemProps
    {
        onClick : () => void,
        openMenu : boolean,
        openCatalog : boolean,
        dropdownRef : React.MutableRefObject<HTMLDivElement | null>,
        onClick1 : () => void,
        onMouseEnter : () => void,
        onMouseLeave : () => void,
        openDrop : boolean,
        isAuthUser : any,
        onClick2 : () => void
    }

export function HeaderItem(
  {
      onClick,
      openMenu,
      openCatalog,
      onClick1,
      onMouseEnter,
      onMouseLeave,
      openDrop,
      isAuthUser,
      onClick2
  } : HeaderItemProps) {
    
    const path = useRouter()
    const localStorage = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    
    const handleToPage = () => {
        path.push('/personal-cabinet')
    }
    
    
    return <>
        <Link className="logo" href="/">
            <button onClick={ onClick } className="w-max burger-menu">
                { openMenu || openCatalog ? (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7L7 21M7 7L21 21" stroke="#262D29" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 14H24.5M3.5 7H24.5M3.5 21H24.5" stroke="#262D29" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) }
            </button>
            <img src="/logo.svg" alt="Logo"/>
        </Link>
        <div className="header-catalog max-w-[135px] w-full ">
            <CatalogItems
              onClick={ onClick1 }
              onMouseEnter={ onMouseEnter }
              onMouseLeave={ onMouseLeave }
              openDrop={ openDrop }/>
        </div>
        <div className="max-w-[605px] w-full header-search">
            <InputSearch>
                <span className="opacity-10">|</span>
                <img src="/svg/search-green.svg" alt="Search"/>
            </InputSearch>
        </div>
        <div className="max-w-max w-full header-lang">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Ru"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="en">En</SelectItem>
                        <SelectItem value="uzb">Uzb</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div className="header-icons">
            { isAuthUser && localStorage !== null ? (
              <button onClick={ handleToPage } className="flex items-center gap-2 h-[20px]">
                  <img src="/svg/user.svg" alt="User"/>
                  Profile
              </button>
            ) : (
              <Button onClick={ onClick2 } className="w-[77px] shadow-custom">Sign
                  in</Button>
            ) }
            <span></span>
            <div className="w-[20px] h-[20px]">
                <img src="/svg/heart.svg" alt="Heart"/>
            </div>
            <span></span>
            <div className="w-[20px] h-[20px]">
                <img src="/svg/shopping-bag.svg" alt="Heart"/>
            </div>
            <span></span>
            <div className="w-[20px] h-[20px]">
                <img className="w-full" src="/svg/message.svg" alt="Heart"/>
            </div>
        </div>
        <div className="header-icons-mobil">
            <div className="w-[28px] h-[28px]">
                <img src="/svg/search-black.svg" alt="Heart"/>
            </div>
            <span></span>
            <div className="w-[28px] h-[28px]">
                <img className="w-full" src="/svg/shopping-bag.svg" alt="Heart"/>
            </div>
            <span></span>
            <div className="w-[28px] h-[28px]">
                <img className="w-full" src="/svg/message.svg" alt="Heart"/>
            </div>
        </div>
    </>;
}