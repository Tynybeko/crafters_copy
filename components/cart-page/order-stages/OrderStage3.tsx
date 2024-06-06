import { Button } from '@/components/ui/button'
import React from 'react'



export default function OrderStage3({ next }: { next: () => void }) {
    return (
        <div className='w-full flex flex-col gap-2 border-primary border rounded-[32px] py-10 px-8'>
            <div>
                <p className='text-gray-500 text-[16px]'>This Privacy Policy describes how we collect, use, and protect the information you provide when using our website describes how we collect, use, and protect the information you provide when using our website how we collect, use, and protect the information you provide when using our website.</p>

                <Button onClick={next} className='w-full mt-6'>
                    Confirm
                </Button>
            </div>
        </div>
    )
}
