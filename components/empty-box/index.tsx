import React from 'react'

interface IEmptyBoxProps {
    text?: string
}


export default function EmptyBox({ text }: IEmptyBoxProps) {
    return (
        <div className='w-full justify-center flex'>
            {text ?? `Пока пусто`}
        </div>
    )
}
