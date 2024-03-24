import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import original from "./img/original.jpg";
import Boards from "./components/Boards";
import Title from "./components/title";
import { cardState, shuffledCardState } from "./atoms";

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: #f6e9fb;
  height: 100vh;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const CompleteImgBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  top: 50px;
  left: 100px;
  border: 5px dashed green;
`;

const Frame = styled.div`
  display: flex;
  height: 30rem;
  border: 5px dashed green;
  overflow: hidden;
`;

function App() {
  const [card, setCard] = useRecoilState(cardState);

  const shuffledCards = useRecoilValue(shuffledCardState);

  useEffect(() => {
    // Trigger shuffling when the component mounts
    setCard(shuffledCards);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // 상태 변경 감지 후 조건 확인
    if (
      card.one[0].index === 1 &&
      card.one[1].index === 2 &&
      card.one[2].index === 3 &&
      card.two[0].index === 4 &&
      card.two[1].index === 5 &&
      card.two[2].index === 6 &&
      card.three[0].index === 7 &&
      card.three[1].index === 8 &&
      card.three[2].index === 9
    ) {
      // 조건이 충족되면 알림 표시
      setTimeout(() => {
        alert("Complete!!");
      }, 1000);
    }
  }, [card]);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    // 목적지가 없다면 그냥 종료.
    if (!destination) return;

    // 1. destination과 source의 droppableId가 같으면 같은 곳에서의 이동
    if (destination?.droppableId === source.droppableId) {
      setCard((oldBoards) => {
        const boardCopy = [...oldBoards[source.droppableId]]; // oldBoards obj로 들어가서 source.droppableId와 같은 키값을 불러옴.
        const taskObj = boardCopy[source.index]; // 해당 키값의 인덱스
        boardCopy.splice(source.index, 1); // 해당 인덱스에서 아이템 삭제
        boardCopy.splice(destination?.index, 0, taskObj); // 해당 인덱스에 아이템(draggableId)삽입
        return {
          // 기존의 oldBoards를 불러오고 source.droppableId key값을 boardCopy로 교체.
          ...oldBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    // 2. destination과 source의 droppableId가 다른 곳에서의 이동
    if (destination.droppableId !== source.droppableId) {
      setCard((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 소스 복사
        const taskObj = sourceBoard[source.index]; // 해당 키값의 인덱스
        const destinationBoard = [...allBoards[destination.droppableId]]; // 데스티네이션 복사.
        const destinationObj = destinationBoard[destination.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        sourceBoard.splice(source.index, 0, destinationObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <Wrapper>
        <Title></Title>
        <Body>
          <DragDropContext onDragEnd={onDragEnd}>
            <Frame>
              {Object.keys(card).map((boardId) => (
                <Boards key={boardId} boardId={boardId} card={card} />
              ))}
            </Frame>
          </DragDropContext>
          <CompleteImgBox>
            <Img src={original} />
          </CompleteImgBox>
        </Body>
      </Wrapper>
    </>
  );
}

export default App;
