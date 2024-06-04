'use client'
import Loading from '@/app/loading'
import './my-feedback.css'
import { apiToken } from '@/axios'
import { useAppDispatch } from '@/redux/hooks'
import { setToastiState } from '@/redux/slices/toastiSlice'
import { IReviewType } from '@/types'
import React, { useEffect, useState } from 'react'
import FeedbackCard from './card'
import EmptyBox from '../ui/empty-box'


type IDataResState = {
    data: IReviewType[] | null,
    loading: boolean,
    error: string
}

const mainPathData = [
    { text: 'My', path: '/item-reviews/' },
    { text: 'Company', path: '/my-company-reviews/' }
]

export default function MyFeedbackPage() {
    const dispatch = useAppDispatch()
    const [mainPath, setMainPath] = useState<{ text: string, path: string }>({ text: 'My', path: '/item-reviews/' })
    const [dataRes, setDataRes] = useState<IDataResState>({
        data: null,
        loading: false,
        error: ''
    })

    useEffect(() => {
        setDataRes(prev => ({ ...prev, loading: true }))
        const response = apiToken.get(mainPath.path)
        response
            .then(data => {
                if (data.data) {
                    setDataRes(prev => ({ ...prev, data: data.data, loading: false, error: '' }))
                }
            })
            .catch(err => {
                setDataRes(prev => ({ ...prev, error: err.message ?? 'Ошибка', loading: false }))
                dispatch(setToastiState([{ type: 'error', data: err.message ?? 'Не удалось получить данные!' }]))
                if (err.response && err.response.status == 403) {
                    setMainPath({ text: 'My', path: '/item-reviews/' })
                }
            })
    }, [mainPath])

    return (
        <div className='my-feedback'>
            {dataRes.loading && <Loading />}
            <div className='my-feedback_head'>
                <h2>Feedback</h2>
                <div className='flex gap-3'>
                    {
                        mainPathData.map(item => (
                            <p onClick={() => setMainPath(item)} className={`${item.text == mainPath.text && 'active'}`}>{item.text}</p>
                        ))
                    }

                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    dataRes.data && dataRes.data.map(item => (
                        <FeedbackCard item={item} />
                    ))
                }
                {
                    dataRes.data && dataRes.data.length == 0 ?
                        <EmptyBox />
                        : null
                }

            </div>
            <div>
            </div>
        </div >
    )
}
