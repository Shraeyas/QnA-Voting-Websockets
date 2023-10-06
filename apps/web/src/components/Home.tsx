import { useRef } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const roomIdRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(roomIdRef.current && roomIdRef.current.value && roomIdRef.current.value.length) {
      navigate(`../room/${roomIdRef.current.value}`);
    }
  };

  return (
    <>
      <form method='post'>
        <input className='m-3 p-3 rounded-md outline outline-2' id={'typeRoom'} placeholder='Enter Room ID' name='room' ref={roomIdRef} />
        <button className='m-3 outline outline-2' id={'joinRoom'} type={'submit'} onClick={onSubmit}>Join</button>
      </form>
    </>
  );
}