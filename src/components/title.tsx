import styled from "styled-components";

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding: 2rem;
  @import url("https://fonts.googleapis.com/css2?family=Dongle&display=swap");
  font-family: "Dongle", sans-serif;
  font-weight: 600;
  font-style: normal;
  color: red;
`;

function Title() {
  return <TitleDiv>그림 맞추기!</TitleDiv>;
}

export default Title;
