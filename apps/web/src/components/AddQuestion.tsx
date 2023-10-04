import { useContext, useRef } from 'react';
import SocketContext from '../context/SocketContext';
function AddQuestion(props) {
    const { roomId } = props;
    const { socket } = useContext(SocketContext);
    const questionTextRef = useRef();
    const onSubmit = (e: any) => {
        e.preventDefault();
        socket.emit('submitQuestion', roomId, questionTextRef.current.value);
        questionTextRef.current.value = '';
    }
    return (
        <>
            <form>
                <div className='grid grid-cols-12'>
                    <input className='col-span-9 m-3 p-3 rounded-md' id={'typeQuestion'} placeholder={ 'Type question' } ref={ questionTextRef }></input>
                    <button className='col-span-3 m-3' id={'submitQuestion'} type='submit' onClick={ onSubmit }>Add question</button>
                </div>
            </form>
        </>
    )
}
export default AddQuestion;