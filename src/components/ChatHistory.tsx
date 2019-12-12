import React, {useEffect, useState} from "react";
import {getMessages} from "../services";
import {Message} from "../types/backend";

const ChatHistory = () => {
    const loadExistingMessages = async () => {
        setMessages(await getMessages());
    };
    // store messages to state
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        loadExistingMessages();
    }, []);

    //render messages
    return <section>
        {messages.map((message, index) => <div key={`message-${index}`}>{message.user}: {message.message}</div>)}
    </section>
};

export {ChatHistory};
