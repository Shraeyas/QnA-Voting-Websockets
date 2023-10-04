import SocketContext from '../context/SocketContext';
import {useContext} from 'react';
export const UpvoteQuestion = (props) => {
    const { id, upvotesCount, roomId } = props;
    const { socket } = useContext(SocketContext);
  
    const onUpvote = (e: any) => {
      e.preventDefault();
      socket.emit('upvoteQuestion', roomId, parseInt(id), socket.id)
    }
    
    return (
      <div className='col-span-3 m-2 cursor-pointer' onClick={onUpvote}>{ upvotesCount } 👍</div>
    )
}

