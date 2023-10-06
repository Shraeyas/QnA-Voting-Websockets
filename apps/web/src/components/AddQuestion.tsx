import { useContext, useRef } from 'react';
import SocketContext from '../context/SocketContext';
import { AddQuestionInterface } from 'types';

function AddQuestion(props: AddQuestionInterface) {
    const { roomId } = props;
    const { socket } = useContext(SocketContext);
    const questionTextRef = useRef<HTMLInputElement | null>(null);
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(questionTextRef.current && questionTextRef.current.value && questionTextRef.current.value.length) {
            socket.emit('submitQuestion', roomId, questionTextRef.current.value);
            questionTextRef.current.value = '';
        }
    }
    return (
        <>
            <form>
                <div className='grid grid-cols-12'>
                    <input className='col-span-9 m-3 p-3 rounded-md outline outline-2' id={'typeQuestion'} placeholder={ 'Type question' } ref={ questionTextRef }></input>
                    <button className='col-span-3 m-3 outline outline-2' id={'submitQuestion'} type='submit' onClick={ onSubmit }>Add question</button>
                </div>
            </form>
        </>
    )
}
export default AddQuestion;