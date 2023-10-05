import { UpvoteButton } from './UpvoteButton';
import { UpvoteQuestionsInterface } from "types";

const Question = (props: UpvoteQuestionsInterface) => {
  const { id, text, upvotesCount, roomId } = props;
  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='col-span-9 break-words m-2' key={ id }>{ text }</div>
        <div className='col-span-3 break-words' ><UpvoteButton upvotesCount={upvotesCount} roomId={roomId} id={id} /></div>
      </div>
    </>
  );
}

export default Question;