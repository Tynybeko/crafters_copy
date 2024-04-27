'use client';
import {useEffect, useRef, useState} from 'react';


import Box from "@/components/ui/Box";
import {InputSearch} from "@/components/ui/input";


//styles
import './message.css'
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchChatRooms} from "@/redux/slices/chatRooms";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import {IMessages} from "@/types/message";
import {fetchChatMessages} from "@/redux/slices/chatMessages";

function Message() {
    const wsRef = useRef<WebSocket | null>(null)
    const params = useSearchParams()
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const chatRoom = useAppSelector(state => state.chatRooms.data);
    const [uuid, setUuid] = useState(params.get('uuid') || null)
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState<IMessages>()
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const queries = new URLSearchParams({Authorization: `Token ${token}`}).toString();
    const ws: any = new WebSocket(`ws://back.crafters.asia/chat-room/${uuid}/?${queries}`);
    const [messageToSend, setMessageToSend] = useState({})
    const chatMessages = useAppSelector(state => state.chatMessages.data)


    useEffect(() => {
        dispatch(fetchChatRooms());
    }, [dispatch]);

    const WSRoomConnection = () => {
        ws.onopen = () => {
            setConnected(true);
            console.log('WebSocket connection established.');
            dispatch(fetchChatMessages({uuid}))
        };

        ws.onclose = () => {
            setConnected(false);
            console.log('WebSocket connection closed.');
        };

        ws.onmessage = (event: any) => {
            const data = event.data.toString()
            const message = JSON.parse(data)
            if (message.type === 'send_message') {
                setMessages((prevState): any => [...prevState, message])
            }
        }


        wsRef.current = ws;
        return () => {
            ws.close();
            if (wsRef.current) wsRef.current?.close()
        };
    }

    console.log(ws)

    useEffect(() => {
        if (!connected) {
            WSRoomConnection();
        }
    }, [uuid]);

    const handleOpenRoom = (uuid: string) => {
        setUuid(uuid)
        router.push(`${pathname}/?uuid=${uuid}`);
    };

    return (
        <Box className='message'>
            <div className='message-wrapper'>
                <div className='message-people'>
                    <div className='message-people-title'>
                        <p>Продавцы</p>
                    </div>
                    <span className='message-separator-horizontal'/>
                    <div className='message-people-lists'>
                        {chatRoom && chatRoom?.results?.length ? chatRoom.results.map((item: any) => (
                            <div onClick={() => handleOpenRoom(item.uuid)} key={item.uuid}
                                 className='message-people-list'>
                                <div className='message-people-list-img'>
                                    <img src="/images/avatar.jpeg" alt="Avatar"/>
                                </div>
                                <div className='message-people-list-info'>
                                    <h3>{item.name}</h3>
                                    <p>Заказ №352352435</p>
                                </div>
                                <div className='message-people-list-date'>
                                    <div>0</div>
                                    <span>22/01/24</span>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
                <div className='message-separator-vertical'></div>
                <div className='message-screen'>
                    <div className='message-screen-title'>
                        <p>Продавец: Ivan Ivanov Ivanovich</p>
                    </div>
                    <span className='message-separator-horizontal'/>
                    <div className='message-screen-lists'>
                        <div className={'flex flex-col gap-[24px]'}>
                            {chatMessages && chatMessages.results.length ? chatMessages.results.map((item) => (
                                <div key={item.id} className={'message-screen-list'}>
                                    <h3>{item.chat_user.name}</h3>
                                    <Box className={'max-w-max py-[12px] px-[24px] border border-[#1DBE6033]'}>
                                        {item.body}
                                    </Box>
                                    <p>16:04 18.17.23</p>
                                </div>
                            )): null}
                        </div>
                    </div>
                    <div className='flex items-center gap-[24px]'>
                        <label htmlFor="file" className='cursor-pointer'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.6">
                                    <path
                                        d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
                                        stroke="#262D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                            <input type="file" id="file" hidden/>
                        </label>
                        <div className='w-full'>
                            <InputSearch className='w-full' type="text" placeholder='Напишите сообщение'>
                                <svg className={'img-get-message'} width="16" height="16" viewBox="0 0 16 16"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path
                                            d="M6.99833 7.99986H3.33166M3.27523 8.19419L1.71861 12.844C1.59632 13.2093 1.53518 13.3919 1.57906 13.5044C1.61717 13.6021 1.69901 13.6761 1.8 13.7043C1.91629 13.7368 2.09193 13.6577 2.44322 13.4997L13.5842 8.48622C13.9271 8.33192 14.0985 8.25477 14.1515 8.1476C14.1976 8.05449 14.1976 7.94524 14.1515 7.85212C14.0985 7.74495 13.9271 7.6678 13.5842 7.5135L2.43934 2.49834C2.08911 2.34074 1.91399 2.26194 1.79782 2.29426C1.69692 2.32234 1.61509 2.39619 1.57685 2.49369C1.53282 2.60595 1.59331 2.7882 1.7143 3.15271L3.27566 7.85688C3.29644 7.91948 3.30683 7.95079 3.31093 7.9828C3.31457 8.01121 3.31453 8.03997 3.31082 8.06837C3.30664 8.10037 3.29617 8.13164 3.27523 8.19419Z"
                                            stroke="#262D29" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                </svg>
                            </InputSearch>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Message
