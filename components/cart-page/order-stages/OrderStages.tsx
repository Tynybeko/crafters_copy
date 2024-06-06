import React, { ReactNode, SetStateAction } from 'react'


interface IOrderStagesProps {
    children?: ReactNode;
    item: { stage: number, is_complete: boolean, text: string },
    isOpen: boolean,
    setStage: React.Dispatch<SetStateAction<number>>
}

export default function OrderStages({ children, item, isOpen, setStage }: IOrderStagesProps) {
    const select = () => setStage(item.stage)
    return (
        <div className='w-full'>
            <div onClick={select} className={`order-stages-title ${!(item.is_complete || isOpen) ? 'opacity-50' : ''} flex items-center gap-2 mb-4`}>
                <div className={`complete w-8 h-8 rounded-full flex items-center justify-center border-primary border ${item.is_complete ? 'bg-primary' : ''}`}>
                    {item.is_complete ? <img src='/svg/check.svg' alt='Icon' /> : item.stage}
                </div>
                <h2>{item.text}</h2>
            </div>
            {
                children
            }

        </div>
    )
}


