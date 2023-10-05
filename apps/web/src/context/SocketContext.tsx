import { io, Socket } from "socket.io-client";
import { createContext, useState, useEffect } from "react";
import { SocketContextInterface, ServerToClientEvents, ClientToServerEvents, SocketContextProviderProps } from "types";


const SocketContext = createContext<SocketContextInterface>({ socket: io(import.meta.env.VITE_SERVER_URL!)});

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    console.log(import.meta.env.VITE_SERVER_URL)
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(io(import.meta.env.VITE_SERVER_URL!));
    useEffect(() => {
        setSocket(io(import.meta.env.VITE_SERVER_URL!));
    }, []);
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}
export default SocketContext;