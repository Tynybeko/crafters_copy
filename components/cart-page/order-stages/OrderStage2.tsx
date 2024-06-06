import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppDispatch } from '@/redux/hooks'
import { setToastiState } from '@/redux/slices/toastiSlice'
import React, { SetStateAction, useState } from 'react'


export interface IOrderContactDetails {
    phone: string,
    name: string,
    comment: string
}

interface IOrderStagesProps {
    data: IOrderContactDetails,
    setData: (e: any) => void,
    next: () => void
}

export default function OrderStage2({ data, setData, next }: IOrderStagesProps) {
    const dispatch = useAppDispatch()
    const phonePattern = /^\+996\d{9}$/;
    const hanldeCheck = () => {
        if (!(data.phone.trim() && data.name.trim())) return dispatch(setToastiState([{ type: 'error', data: 'Заполните поля!' }]))
        if (!phonePattern.test(data.phone)) return dispatch(setToastiState([{ type: 'error', data: 'Incorrect phone number!' }]))
        next()
    }

    return (
        <div className='w-full flex flex-col gap-2 border-primary border rounded-[32px] py-10 px-8'>
            <div>
                <Input name={"name"} onChange={setData} value={data.name}
                    placeholder={"Your name*"} />
            </div>
            <div>
                <Input name={"phone"} onChange={setData} value={data.phone}
                    placeholder={"Your phone*"} />
            </div>
            <div>
                <Textarea name={"comment"} onChange={setData}
                    value={data.comment}
                    className={"resize-none h-[226px] p-[10px] rounded-[24px]"} />
            </div>
            <div className='mt-6'>
                <p className='underline text-gray-500 flex items-center gap-2'>
                    <svg width="16.000000" height="16.000000" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <defs>
                            <clipPath id="clip4092_25715">
                                <rect id="check-circle" width="16.000000" height="16.000000" fill="white" fill-opacity="0" />
                            </clipPath>
                        </defs>
                        <g clip-path="url(#clip4092_25715)">
                            <path id="Icon" d="M8 14.66C4.31 14.66 1.33 11.68 1.33 8C1.33 4.31 4.31 1.33 8 1.33C11.67 1.33 14.66 4.31 14.66 8C14.66 11.68 11.67 14.66 8 14.66ZM5 8L7 10L11 6" stroke="#1DBE60" stroke-opacity="1.000000" stroke-width="1.000000" stroke-linejoin="round" stroke-linecap="round" />
                        </g>
                    </svg>
                    Send updates to the post office
                </p>
                <Button onClick={hanldeCheck} className='w-full mt-4'>Confirm </Button>
            </div>
        </div>
    )
}
