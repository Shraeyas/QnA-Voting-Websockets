import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SocketContext from '../context/SocketContext';
import Question from './Question';
import AddQuestion from './AddQuestion';
import { RoomPropsInterface } from 'types';

const Room = (props: RoomPropsInterface) => {
  const params = useParams();
  const { socket } = useContext(SocketContext);
  const { questionsList } = props;
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    if(params.roomId) {
      setRoomId(params.roomId);
    }
  }, [params]);

  useEffect(() => {
    if(roomId && socket) {
      socket.emit('joinRoom', roomId); 
    }
  }, [roomId, socket]);

  return (
    <>
      <div className='max-w-6xl'>
        <div className='grid grid-rows-6'>
          <div className='row-span-1 text-3xl font-extrabold'>
            <div className='grid grid-cols-12'>
              <div className='col-span-9 break-words m-2'>{roomId}</div>
            </div>
          </div>
          <div className="row-span-4 overflow-y overflow-x-hidden max-h-96">
            {questionsList && questionsList.map((question) => (
              <>
                <Question
                  key={question.id}
                  id={question.id}
                  text={question.text}
                  upvotesCount={question.upvotesCount}
                  roomId={roomId}
                />
              </>
            ))}
          </div>
          <div className="row-span-1 m-4">
            <AddQuestion roomId={roomId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;