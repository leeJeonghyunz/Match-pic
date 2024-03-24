import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import { IToDo } from "../atoms";

interface ICardProp {
  draggableId: string;
  index: number;
  key: number;
  number: number;
  el: IToDo;
}

const Cards = styled.div`
  height: 10rem;
  border: 1px solid black;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

function Card({ draggableId, index, key, number, el }: ICardProp) {
  return (
    <Draggable draggableId={draggableId} index={index} key={key}>
      {(provided) => (
        <Cards
          key={number}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Img src={el.img} />
        </Cards>
      )}
    </Draggable>
  );
}

export default React.memo(Card);
