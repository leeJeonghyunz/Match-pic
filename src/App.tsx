import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Boards from "./components/Boards";
import Title from "./components/title";
import { IToDoState, cardState, isStartAtom, shuffledCardState } from "./atoms";
import Picture from "./components/Pictures";
import { useMediaQuery } from "react-responsive";

const Body = styled.div<{ isPc: boolean }>`
  display: flex;
  flex-direction: ${(props) => (!props.isPc ? "column" : "")};
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div<{ isPc: boolean }>`
  background-color: #f6e9fb;
  height: 100vh;
  display: ${(props) => (!props.isPc ? "flex" : "")};
  flex-direction: ${(props) => (!props.isPc ? "column" : "")};
`;

const Frame = styled.div`
  display: flex;
  height: 480px;
  width: 760px;
  border: 5px dashed green;
  overflow: hidden;
`;

const EtcWrapper = styled.div<{ isPc: boolean }>`
  display: flex;
  flex-direction: column;
  position: ${(props) => (!props.isPc ? "" : "relative")};
  top: ${(props) => (!props.isPc ? "" : "35px")};
  left: ${(props) => (!props.isPc ? "" : "150px")};
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => (!props.isPc ? "20px" : "")};
`;

function App() {
  const isPc = useMediaQuery({ query: "(min-width: 1024px)" });

  const [card, setCard] = useRecoilState(cardState);
  const [isStartState, setIsStartState] = useRecoilState(isStartAtom);
  const shuffledCards = useRecoilValue(shuffledCardState);

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const changeOrder = () => {
    setCard((prevState) => {
      // 이전 상태 복제
      const newState = { ...prevState };

      // key 배열 생성 및 섞기
      const keys: string[] = Object.keys(newState);
      const keyMappings = ["one", "two", "three"]; // 변경할 이름.
      const shuffledKeys = shuffleArray(keys);

      // 새로운 객체 생성
      const newCardState: IToDoState = {};
      shuffledKeys.forEach((key, index) => {
        newCardState[keyMappings[index]] = newState[key]; // newCardState에 key 값을 keyMappings의 요소들로 하고 랜덤으로 나온 newState의 key값을 집어 넣음.
      });
      return newCardState;
    });
  };

  if (
    isStartState &&
    JSON.stringify(Object.keys(card)) ===
      JSON.stringify(["one", "two", "three"]) &&
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
    setIsStartState(false);
    setTimeout(() => {
      alert("Complete!!");
    }, 1000);
  }

  const onClickBtn = () => {
    setCard(shuffledCards);
    changeOrder();
    setIsStartState(true);
  };

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
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
      <Wrapper isPc={isPc}>
        <Title></Title>
        <Body isPc={isPc}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Frame>
              {Object.keys(card).map((boardId) => (
                <Boards key={boardId} boardId={boardId} card={card} />
              ))}
            </Frame>
          </DragDropContext>
          <EtcWrapper isPc={isPc}>
            <Picture onClickBtn={onClickBtn} />
          </EtcWrapper>
        </Body>
      </Wrapper>
    </>
  );
}

export default App;
