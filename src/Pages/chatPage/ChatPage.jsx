import React, {useState} from 'react'
import Chat from "../../components/chat/Chat"
import Join from "../../components/join/Join"

function ChatPage() {
    const [chatVisibility, setChatVisibility] = useState(false);
    const [socket, setSocket] = useState(null)

    return (
        <div style={{ display: "flex", justifyContent: 'center', paddingTop: "20px" }}>
            {chatVisibility ? (
                <Chat socket={socket}/>
            ) : (
                <Join setChatVisibility={setChatVisibility} setSocket={setSocket} />
            )}
        </div>
    )
}

export default ChatPage;
