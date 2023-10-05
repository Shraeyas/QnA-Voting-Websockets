import { useEffect, useState, useContext } from 'react';
import SocketContext from './context/SocketContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Room from './components/Room';
import './App.css'
import { QuestionsInterface } from "types";

const sortByProperty = (property: keyof QuestionsInterface) => {
  return (a: QuestionsInterface, b: QuestionsInterface) => {
    if(a[property] < b[property]) {
        return 1;
    }
    else if(a[property] > b[property]) {
        return -1;  
    }
    return 0;  
  }
}

const App = () => {
  const [ questionsList, setQuestionsList ] = useState<QuestionsInterface[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if(socket) {
      socket.on('updateQuestion', (newQuestionsList) => {
        if(newQuestionsList) {
          setQuestionsList([...newQuestionsList.sort(sortByProperty("upvotesCount"))])
        }
      });
    }
  }, [socket]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room questionsList={questionsList} />} />          
        </Routes>
      </Router>
    </>
  );
}

export default App;