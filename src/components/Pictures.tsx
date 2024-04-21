import original from "../img/original.jpg";
import mongol from "../img/mongol/original.jpg";
import brazil from "../img/brazil/original.jpg";
import egypt from "../img/egypt/original.jpg";
import usa from "../img/usa/original.jpg";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cardState, isStartAtom } from "../atoms";
import { brazilImg, egyptImg, mongolImg, originalImg, usaImg } from "../img";
import { useMediaQuery } from "react-responsive";

const imgArray = [
  {
    name: "originalImg",
    img: original,
    imgFile: originalImg,
  },
  {
    name: "mongolImg",
    img: mongol,
    imgFile: mongolImg,
  },
  {
    name: "brazilImg",
    img: brazil,
    imgFile: brazilImg,
  },

  {
    name: "egyptImg",
    img: egypt,
    imgFile: egyptImg,
  },
  {
    name: "usaImg",
    img: usa,
    imgFile: usaImg,
  },
];

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const CompleteImgBox = styled.div<{ isPc: boolean }>`
  width: ${(props) => (!props.isPc ? "200px" : "100px")};
  height: 120px;
  border: 5px dashed green;
`;

const CompleteImgBoxSmall = styled.div`
  width: 80px;
  height: 100px;
  border: 5px dashed red;
`;

const Wrapper = styled.div<{ isPc: boolean }>`
  width: ${(props) => (!props.isPc ? "400px" : "260px")};
  height: 120px;
`;

const SliderWrapper = styled.div<{ index: number }>`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) =>
    props.index === 0
      ? "flex-end"
      : props.index === imgArray.length - 1
      ? "flex-start"
      : "center"};
`;

const Button = styled.button`
  background-color: #fa5a5a;
  color: white;
  margin-top: 20px;
  padding: 15px 45px;
  font-size: 22px;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:active {
    transform: scale(0.95); /* 클릭됐을 때 버튼이 조금 축소됨 */
  }
`;

const ButtonStart = styled.button`
  background-color: #f1c40f;
  color: white;
  margin-top: 20px;
  padding: 15px 45px;
  font-size: 22px;
  border: 1px solid rgba(0, 0, 0, 0.21);
  border-bottom: 4px solid rgba(0, 0, 0, 0.21);
  border-radius: 4px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:active {
    transform: scale(0.95); /* 클릭됐을 때 버튼이 조금 축소됨 */
  }
`;

interface PictureProps {
  onClickBtn: () => void;
}

export default function Picture({ onClickBtn }: PictureProps) {
  const isPc = useMediaQuery({ query: "(min-width: 1024px)" });
  const setCard = useSetRecoilState(cardState);
  const [isStartState, setIsStartState] = useRecoilState(isStartAtom);

  const handleSwiper = (swiper: any) => {
    const index = swiper.activeIndex;
    const imageFile = imgArray[index].imgFile;
    setCard(imageFile);
    setIsStartState(false);
  };

  return (
    <>
      <Wrapper isPc={isPc}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation
          onSlideChange={(swiper: any) => handleSwiper(swiper)}
        >
          {imgArray.map((el, index) => (
            <SwiperSlide>
              <SliderWrapper index={index}>
                {index !== 0 && (
                  <CompleteImgBoxSmall>
                    <Img src={imgArray[index - 1].img} /> {/* 이전 요소 */}
                  </CompleteImgBoxSmall>
                )}
                <CompleteImgBox isPc={isPc}>
                  <Img src={el.img} /> {/* 현재 요소 */}
                </CompleteImgBox>
                {index !== imgArray.length - 1 && (
                  <CompleteImgBoxSmall>
                    <Img src={imgArray[index + 1].img} /> {/* 다음 요소 */}
                  </CompleteImgBoxSmall>
                )}
              </SliderWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
      {isStartState ? (
        <Button onClick={onClickBtn}>다시하기</Button>
      ) : (
        <ButtonStart onClick={onClickBtn}>시작하기</ButtonStart>
      )}
    </>
  );
}
