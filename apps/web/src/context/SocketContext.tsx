import { io } from "socket.io-client";
import { createContext, useState, useEffect } from "react";
const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io('http://localhost:5000'));
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
export default SocketContext;