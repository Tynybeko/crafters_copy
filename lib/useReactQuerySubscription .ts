import React, {useEffect, useRef} from "react";
import {io, Socket} from "socket.io-client";

const useReactQuerySubscription = () => {
    const socket = useRef<Socket>()

    useEffect(() => {
        socket.current = io('back.crafters.asia/api/v1/chat/messages/')

        socket.current?.on('connect', () => {
            console.log('Podlklyuchilsa')
        })

        socket.current?.on('invalidate', (data) => {
        })
    }, []);
}