import React, {useEffect, useState} from "react";
import {getMessages} from "../services";
import {Message} from "../types/backend";
import '../echo';

const ChatHistory = () => {
    const [messages, setMessages] = useState<Message[]>([{user: 'no one', message: 'Default'}]);

    const loadExistingMessages = async () => {
        await setMessages(await getMessages());
    };
    // store messages to state


    useEffect(() => {
        loadExistingMessages();
        window.Echo.channel('room').listen('.App\\Events\\NewMessageReceived', (newMessage: Message) => {
            setMessages((messages) => [...messages, newMessage]);
        });
    }, []);

    //render messages
    return <section>
        {messages.map((message, index) => <div className="message-card"
                                               key={`message-${index}`}>{message.user}: {message.message}</div>)}
    </section>
};

export {ChatHistory};
