import React from 'react'






export default function EmptyBox({ text }: { text?: string }) {
    return (
        <div>
            {text ?? 'Пока пусто'}
        </div>
    )
}
