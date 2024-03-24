import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "./Card";
import { IToDoState } from "../atoms";

const Wrapper = styled.div`
  display: grid;
  width: 100%;
`;

interface IBoardsProps {
  boardId: string;
  card: IToDoState;
}

function Boards({ boardId, card }: IBoardsProps) {
  return (
    <Wrapper key={boardId}>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <div key={boardId} ref={provided.innerRef}>
            {card[boardId].map((el, number) => (
              <Card
                draggableId={el.index + ""}
                index={number}
                key={el.index}
                number={number}
                el={el}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Boards;
