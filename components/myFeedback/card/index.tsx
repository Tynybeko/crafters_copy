import { apiToken } from '@/axios';
import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { setToastiState } from '@/redux/slices/toastiSlice';
import { IReviewType } from '@/types'
import React, { useState } from 'react'


interface IFeedbackCardProps {
    item?: IReviewType,
    company?: boolean
}

export default function FeedbackCard({ item, company }: IFeedbackCardProps) {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const handleCopy = () => {
        navigator.clipboard.writeText(item?.item.code ?? '12345');
        dispatch(setToastiState([{ type: 'succes', data: 'Скопировано' }]))
    }
    const handleDelete = () => {
        setLoading(true)
        const response = apiToken.delete(`/my-reviews/${item?.id}/`)
        response
            .then(res => {
                setLoading(false)
                dispatch(setToastiState([{ type: 'succes', data: 'Удалено!' }]))

            })
            .catch(err => {
                setLoading(false)
                dispatch(setToastiState([{ type: 'error', data: 'Произошла ошибка при удалении отзыва!' }]))
            })
    }

    return (
        <div className='feedback-card'>
            {loading && <Loading />}
            <div className='feedback-card__head flex items-center justify-between'>
                <div className="feedback-card__head_company">
                    {item?.company?.legal_name}
                </div>
                <div className="feedback-card__head_reviews">
                    <div className={"flex items-center"}>
                        {[1, 2, 3, 4, 5].map((star: number) => (
                            <img key={star}
                                src={`/svg/star${star <= (item?.quality ?? 0) ? '' : '-outline'}.svg`}
                                alt='' />
                        ))}
                        <p className='ml-2'>Quality</p>
                    </div>
                    <div className={"flex items-center"}>
                        {[1, 2, 3, 4, 5].map((star: number) => (
                            <img key={star}
                                src={`/svg/star${star <= (item?.price_relevance ?? 0) ? '' : '-outline'}.svg`}
                                alt='' />
                        ))}
                        <p className='ml-2'>Price</p>
                    </div>
                    <div className={"flex items-center"}>
                        {[1, 2, 3, 4, 5].map((star: number) => (
                            <img key={star}
                                src={`/svg/star${star <= (item?.delivery ?? 0) ? '' : '-outline'}.svg`}
                                alt='' />
                        ))}
                        <p className='ml-2'>Delivery</p>
                    </div>
                </div>
            </div>
            <div className="feedback-card__item">
                <div className='flex items-center gap-5'>
                    <img className='feedback-card__item_img' width={80} height={80} src={item?.item?.image} alt="Img" />
                    <div className='flex flex-col'>
                        <p className='item_code flex gap-2'>Cod: {item?.item?.code ?? '00000'}
                            <img
                                src="/svg/copy.svg"
                                alt="Copy Code"
                                onClick={handleCopy}
                                style={{ cursor: 'pointer' }}
                            /></p>
                        <h3 className='text-[20px]'>{item?.item?.name ?? 'Неизвестно'}</h3>
                    </div>
                </div>

                <div className='item_border_left w-full text-center'>
                    <p>Price</p>
                    <h3 className='text-orange-400'>
                        {item?.item?.currency?.code ?? 'С'}{item?.item?.price}
                    </h3>
                </div>
            </div>
            <div className='feedback-card_someText'>
                <p className='content'>
                    {item?.comment}
                </p>
            </div>
            <hr className='border-gray-300' />
            {
                item?.advantages ?
                    <div className='feedback-card_someText'>
                        <p className='title'>Advantages</p>
                        <p className='content'>{item?.advantages}</p>
                    </div>
                    : null
            }
            {
                item?.disadvantages ?
                    <div className='feedback-card_someText'>
                        <p className='title'>Disadvantages</p>
                        <p className='content'>{item?.disadvantages}</p>
                    </div>
                    : null
            }
            {
                !company ?
                    <div className='feedback-card-action'>
                        <Button disabled={loading} onClick={handleDelete} size={'sm'} variant={'destructiveOutline'} >Delete</Button>
                    </div> : null
            }

        </div>
    )
}

