import { useRef } from 'react'
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const roomIdRef = useRef();
  const onSubmit = (e: any) => {
    e.preventDefault();
    navigate(`../room/${roomIdRef.current.value}`);
  };
  return (
    <>
      <form method='post'>
        <input id={'typeRoom'} placeholder='Enter Room ID' name='room' ref={roomIdRef} />
        <button id={'joinRoom'} type={'submit'} onClick={onSubmit}>Join</button>
      </form>
    </>
  );
}