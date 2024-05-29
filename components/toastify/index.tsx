'use client'
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { ToastifyTypesEnum, removeToastiState } from "@/redux/slices/toastiSlice"
import React, { useEffect, useMemo, useState } from "react"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"


const ToastiColorVar: { [key in ToastifyTypesEnum]: string } = {
    'succes': `border-green-500 text-green-500`,
    'error': `border-red-500 text-red-500`,
    'warning': `border-orange-500 text-orange-500`,
}

interface IToastiPointProps {
    type: string
}


interface IToastifyInitProps {
    toastiType: ToastifyTypesEnum
}

interface IToastifyStateComponentsProps {
    text: string;
    id: number
    type: ToastifyTypesEnum
}


export default function ToastifyRoot() {
    const state = useAppSelector((state) => state.toastify)
    return (
        <div className="fixed flex gap-2 flex-col p-5 right-0 top-0 z-[100] toastify_box">
            {
                state.data.map(item => (
                    <ToastiT key={item.id} type={item.type} id={item.id} text={item.data} />
                ))
            }
        </div>
    )
}



export const ToastiPoint: React.FC<IToastiPointProps> = ({ type }) => {
    let bgColor = ''
    switch (type) {
        case 'succes':
            bgColor = 'bg-green-500'
            break
        case 'error':
            bgColor = 'bg-red-500'
            break
        case 'warning':
            bgColor = 'bg-orange-500'
            break
        default:
            bgColor = 'bg-blue-500'
            break

    }
    return (
        <div className={`w-4 min-h-12 ${bgColor} rounded-l-lg`}></div>
    )
}






export const ToastiT: React.FC<IToastifyStateComponentsProps> = ({ text, id, type }) => {
    const dispatch = useAppDispatch()
    const removeState = () => {
        dispatch(removeToastiState({ toastiType: type, data: id }))
    }

    useEffect(() => {
        const timer = setTimeout(() => dispatch(removeToastiState({ toastiType: type, data: id })), 2900);
        return () => clearTimeout(timer);
    }, [id, type]);

    return (
        <div onClick={removeState} className={`relative z-[1000] text-black border-2  bg-white rounded-xl   toastify_items flex items-stretch  ${ToastiColorVar[type] ?? ''}`}>
            <ToastiPoint type={type} />
            <p >
                {text}
            </p>
        </div>
    )
}

