import { useRef } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const roomIdRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(roomIdRef.current) {
      navigate(`../room/${roomIdRef.current.value}`);
    }
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