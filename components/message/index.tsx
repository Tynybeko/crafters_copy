'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Box from "@/components/ui/Box";
import { InputSearch } from "@/components/ui/input";
// styles
import './message.css'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchChatRooms } from "@/redux/slices/chatRooms";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IMessageResults, IMessages } from "@/types/message";
import { fetchChatMessages } from "@/redux/slices/chatMessages";
import MiniLoading from '@/components/mini-loading/MiniLoading';
import { setToastiState } from '@/redux/slices/toastiSlice';
import { apiToken } from '@/axios';





function Message() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const chatBoxRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    const [uuid, setUuid] = useState(params.get('uuid') || null);
    const [messageLimit, setMessageLimit] = useState(30);
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageToSend, setMessageToSend] = useState({ body: '', file: null, photo: null });

    const chatRoom = useAppSelector(state => state.chatRooms.data);
    const chatMessages = useAppSelector(state => state.chatMessages.data);
    const myUser = useAppSelector(state => state.user);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const queries = new URLSearchParams({ Authorization: `Token ${token}` }).toString();

    const scrollToBottom = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        dispatch(fetchChatRooms());
    }, [dispatch]);

    useEffect(() => {
        if (messageLimit === 30) scrollToBottom();

        const unreadMessages = chatMessages?.results.filter(item => item.chat_user.user.id !== myUser?.data?.id && !item.is_read) || [];
        unreadMessages.forEach(message => {
            wsRef.current?.send(JSON.stringify({ type: 'MAKE_READ_MESSAGE', message_id: message.id }));
        });
    }, [chatMessages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const WSRoomConnection = () => {
        setLoading(true);
        const ws = new WebSocket(`ws://back.crafters.asia/chat-room/${uuid}/?${queries}`);

        ws.onopen = () => {
            setLoading(false);
            console.log('WebSocket connection established.');
        };

        ws.onerror = (e) => {
            dispatch(setToastiState([{ type: 'error', data: 'Не удалось установить соединение!' }]));
            setLoading(false);
            console.log(e);
        };

        ws.onclose = () => {
            setMessages([]);
            setMessageLimit(30);
            console.log('WebSocket connection closed.');
        };

        ws.onmessage = (event: any) => {
            const message = JSON.parse(event.data);
            if (message.type === 'send_message') {
                setMessages(prevMessages => [...prevMessages, message]);
                scrollToBottom();
            }
            setLoading(false);
        };

        wsRef.current = ws;
        return () => ws.close();
    };

    useEffect(() => {
        const wsConnection = WSRoomConnection();
        dispatch(fetchChatMessages({ uuid, query: { limit: messageLimit } }));
        return wsConnection;
    }, [uuid]);

    const handleOpenRoom = (uuid: string) => {
        setUuid(uuid);
        router.push(`${pathname}/?uuid=${uuid}`);
    };

    const handleSendFileOrPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const file = e.target.files?.[0];
        if (file) {
            const data = new FormData();
            data.append(file.type.includes('image') ? 'photo' : 'file', file);
            try {
                await apiToken.post(`/chat/messages/upload-file/${uuid}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
                scrollToBottom();
            } catch (err: any) {
                const errorMessages = Object.values(err?.response?.data || {}).flat().map(message => ({ type: 'error', data: message }));
                dispatch(setToastiState(errorMessages));
            }
        }
    };

    const handleSendMessage = () => {
        if (!messageToSend.body.trim() || !wsRef.current) return;

        const message = {
            type: 'send_message',
            body: messageToSend.body,
            created_at: new Date().toISOString(),
        };
        wsRef.current.send(JSON.stringify(message));
        setMessageToSend({ body: '', file: null, photo: null });
    };







    return (
        <Box className='message'>
            {loading && <div className='absolute left-0 bottom-0 flex w-full z-10 h-full justify-center items-center '>
                <MiniLoading />
            </div>}
            <div className='message-wrapper'>
                <div className='message-people'>
                    <div className='message-people-title'>
                        <p>Продавцы</p>
                    </div>
                    <span className='message-separator-horizontal' />
                    <div className='message-people-lists'>
                        {chatRoom && chatRoom?.results?.length ? chatRoom.results.map((item: any) => (
                            <div onClick={() => handleOpenRoom(item.uuid)} key={item.uuid}
                                className='message-people-list'>
                                <div className='message-people-list-img'>
                                    <img src="/images/avatar.jpeg" alt="Avatar" />
                                </div>
                                <div className='message-people-list-info'>
                                    <h3>{item.name}</h3>
                                </div>
                                <div className='message-people-list-date'>
                                    {
                                        item.unread_messages ? <div className='count'>{String(item.unread_messages).length > 2 ? '∞' : item.unread_messages}</div> : <div className='mb-6'></div>
                                    }
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
                    <span className='message-separator-horizontal' />
                    <div className='message-screen-lists'>
                        <div ref={chatBoxRef} className={'flex flex-col gap-[24px]'}>
                            {
                                (chatMessages?.results && chatMessages.count > chatMessages.results.length) ? <button className='px-5 py-2 bg-green-500 rounded-lg max-w-50 text-white' onClick={() => {
                                    dispatch(fetchChatMessages({ uuid, query: { limit: (messageLimit + 30), } }))
                                    setMessageLimit(prev => prev + 30)
                                }}>Загрузить еще</button> : null
                            }
                            {chatMessages && chatMessages.results.length ? chatMessages.results.map((item, index) => (
                                <div key={item.id} ref={index === chatMessages?.results.length - 1 && messages.length == 0 ? lastMessageRef : null} className={`message-screen-list ${item.chat_user?.user?.id == myUser?.data?.id ? 'items-end' : ''}`}>
                                    <h3>{item.chat_user.name}</h3>
                                    <Box className={'max-w-max py-[12px] px-[24px] border border-[#1DBE6033]'}>
                                        {item.body}
                                        {item.photo && <img src={item.photo} alt="file" />}
                                        {item.file && <a className='bg-blue-500 rounded-lg px-4 py-2 flex text-white' href={item.file} download={true} >File <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="https://www.w3.org/2000/svg">
                                            <g opacity="0.6">
                                                <path
                                                    d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg> </a>}
                                    </Box>
                                    <p>{new Date(item.created_at).toLocaleTimeString()} {new Date(item.created_at).toLocaleDateString()} {item.chat_user?.user?.id == myUser?.data?.id ? (item.is_read ? <span className='text-green-500'>Прочитано</span> : null) : null}</p>
                                </div>
                            )) : null}
                            {messages.map((item, index) => (
                                <div key={item.id} ref={index === messages.length - 1 ? lastMessageRef : null} className={`message-screen-list items-end`}>
                                    <h3>{item?.name}</h3>
                                    <Box className={'max-w-max py-[12px] px-[24px] border border-[#1DBE6033]'}>
                                        {item.body}
                                        {item.photo && <img src={item.photo} alt="file" />}
                                        {item.file && <a className='bg-blue-500 rounded-lg px-3 py-2 flex gap-2 text-white ' href={item.file} download={true} >File <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="https://www.w3.org/2000/svg">
                                            <g opacity="0.6">
                                                <path
                                                    d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg> </a>}
                                    </Box>
                                    <p>{new Date(item.created_at).toLocaleTimeString()} {new Date(item.created_at).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center gap-[24px]'>
                        <label htmlFor="file" className='cursor-pointer'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="https://www.w3.org/2000/svg">
                                <g opacity="0.6">
                                    <path
                                        d="M17.5 5.25581V16.5C17.5 19.5376 15.0376 22 12 22C8.96243 22 6.5 19.5376 6.5 16.5V5.66667C6.5 3.64162 8.14162 2 10.1667 2C12.1917 2 13.8333 3.64162 13.8333 5.66667V16.4457C13.8333 17.4583 13.0125 18.2791 12 18.2791C10.9875 18.2791 10.1667 17.4583 10.1667 16.4457V6.65116"
                                        stroke="#262D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <input onChange={handleSendFileOrPhoto} type="file" id="file" hidden />
                        </label>
                        <div className='w-full'>
                            <InputSearch
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessage();
                                    }
                                }}
                                value={messageToSend.body}
                                onChange={(e) => setMessageToSend((prev: any) => ({ ...prev, body: e.target.value }))}
                                className='w-full'
                                type="text"
                                placeholder='Напишите сообщение'>
                                <svg onClick={handleSendMessage} className={'img-get-message'} width="16" height="16" viewBox="0 0 16 16"
                                    fill="none" xmlns="https://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path
                                            d="M6.99833 7.99986H3.33166M3.27523 8.19419L1.71861 12.844C1.59632 13.2093 1.53518 13.3919 1.57906 13.5044C1.61717 13.6021 1.69901 13.6761 1.8 13.7043C1.91629 13.7368 2.09193 13.6577 2.44322 13.4997L13.5842 8.48622C13.9271 8.33192 14.0985 8.25477 14.1515 8.1476C14.1976 8.05449 14.1976 7.94524 14.1515 7.85212C14.0985 7.74495 13.9271 7.6678 13.5842 7.5135L2.43934 2.49834C2.08911 2.34074 1.91399 2.26194 1.79782 2.29426C1.69692 2.32234 1.61509 2.39619 1.57685 2.49369C1.53282 2.60595 1.59331 2.7882 1.7143 3.15271L3.27566 7.85688C3.29644 7.91948 3.30683 7.95079 3.31093 7.9828C3.31457 8.01121 3.31453 8.03997 3.31082 8.06837C3.30664 8.10037 3.29617 8.13164 3.27523 8.19419Z"
                                            stroke="#262D29" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </InputSearch>
                        </div>
                    </div>
                </div>
            </div>
        </Box >
    );
}

export default Message;
