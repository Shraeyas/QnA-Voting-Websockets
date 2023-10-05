import { Socket } from "socket.io-client";

export interface UpvotesInterface {
    id: number,
    questionId: number,
    userId: string
}

export interface QuestionsInterface {
    id: number,
    text: string,
    userId: string,
    roomId: string,
    upvotes: UpvotesInterface[],
    upvotesCount: number
}

export interface AddQuestionInterface {
    roomId: string,
}


export interface UpvoteQuestionsInterface {
    id: number,
    text: string,
    roomId: string,
    upvotesCount: number
}

export interface UpvoteButtonInterface {
    id: number,
    roomId: string,
    upvotesCount: number
}

export interface RoomPropsInterface {
  questionsList: QuestionsInterface[]
}

export interface ServerToClientEvents {
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    chatMessage: (message: string) => void;
    updateQuestion: (questionsWithUpvoteCount: QuestionsInterface[]) => void;
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string) => void;
    submitQuestion: (roomId: string, questionText: string) => void;
    upvoteQuestion: (roomId: string, questionId: number, userId: string) => void;
}

export interface SocketContextInterface {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

export interface SocketContextProviderProps {
    children: React.ReactNode;
}