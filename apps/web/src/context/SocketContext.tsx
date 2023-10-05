import { io, Socket } from "socket.io-client";
import { createContext, useState, useEffect } from "react";
import { SocketContextInterface, ServerToClientEvents, ClientToServerEvents, SocketContextProviderProps } from "types";

const SocketContext = createContext<SocketContextInterface>({ socket: io('http://localhost:5000')});

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io('http://localhost:5000'));
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