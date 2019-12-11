import React, {useState, MouseEvent} from 'react';
import {postMessage} from "../services";

export function Chat() {
    const [message, setMessage] = useState('');

    const handlePostMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await postMessage(message);
    };

    return <div className="chat-component">
        Chat
        <input type="text" value={message} onChange={event => setMessage(event.target.value)}/>
        <button type="submit" onClick={handlePostMessage}/>
    </div>;
}
