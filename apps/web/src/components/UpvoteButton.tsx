import SocketContext from '../context/SocketContext';
import {useContext} from 'react';
import { UpvoteButtonInterface } from 'types';

export const UpvoteButton = (props: UpvoteButtonInterface) => {
  const { id, upvotesCount, roomId } = props;
  const { socket } = useContext(SocketContext);

  const onUpvote = (e: React.SyntheticEvent) => {
    e.preventDefault();
    socket.emit('upvoteQuestion', roomId, id, socket.id)
  }
  
  return (
    <div className='col-span-3 m-2 cursor-pointer' onClick={onUpvote}>{upvotesCount} 👍</div>
  )
}