import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from "./components/EmptyBoard";
import { fetchBoards, setBoardActive } from "./redux/boardsSlice";

function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.boards);
  const boardStatus = useSelector((state) => state.boards.status);
  const error = useSelector((state) => state.boards.error);

  useEffect(() => {
    if (boardStatus === 'idle') {
      dispatch(fetchBoards());
    }
  }, [boardStatus, dispatch]);

  useEffect(() => {
    if (Boolean(boards) && boards.length > 0 && !boards.some((board) => board.isActive)) {
      dispatch(setBoardActive({ index: 0 }));
    }
  }, [boards, dispatch]);

  if (boardStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (boardStatus === 'failed') {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
          <Home setIsBoardModalOpen={setIsBoardModalOpen} isBoardModalOpen={isBoardModalOpen} />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default App;
