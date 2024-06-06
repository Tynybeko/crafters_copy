import { Button } from '@/components/ui/button'
import React from 'react'

export default function OrderStage4({ next }: { next: () => void }) {
    return (
        <div className='w-full flex flex-col gap-2 border-primary border rounded-[32px] py-10 px-8'>
            <div>
                <div>
                    <p className='flex gap-2 text-[16px] text-gray-500 '>Vendor: <span className='text-black'>Magazine</span> <img src="/svg/shop.svg" alt="IMG" /></p>
                </div>
                <div className='grid grid-cols-2 items-center'>
                    <p className='text-gray-500'>This Privacy Policy describes how we collect, use, and protect the information you provide when using our website describes how we collect, use, and protect the information you provide when using our website how we collect, use, and protect the information you provide when using our website.</p>
                    <div className='flex flex-col gap-6 pl-6 border-l-2 border-l-gray-400 items-start'>
                        <h2 className='text-[20px]'>Merchant card details</h2>
                        <p className='text-gray-500'>MBANK 0000 0000 0000 0000</p>
                        <Button>Pay</Button>
                    </div>
                </div>
            </div>
            <Button className='mt-6' onClick={next}>Confirm</Button>
        </div>
    )
}
