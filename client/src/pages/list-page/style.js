import styled from "styled-components";
import allDonePic from "../../asset/pic/alldone-pic.png";
import listPagePic from "../../asset/pic/list-page-pic.png";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  margin: 50px auto;
  padding: 20px 50px;
  justify-content: space-evenly;
  align-items: center;
  background: #f7f8fc;
  font-family: "Inter", "Gill Sans", sans-serif;
  border-radius: 30px;
  background-image: url(${listPagePic});
  background-size: 150px;
  background-repeat: repeat-x;
  background-position: 90% 100%;
  &.hidebgimage {
    background-image: none;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
  justify-content: start;
  align-items: baseline;
  border-bottom: 3px solid #ebbcd3;
  padding-bottom: 5px;
`;

export const StyledH3 = styled.h3`
  margin: 0;
`;

export const StyledH1 = styled.h1`
  margin: 0;
  font-size: 32px;
  line-height: 50px;
  color: #1a1a1a;
`;

export const StyledSpan = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: #ebbcd3;
  font-weight: bold;
  &.hide {
    display: none;
  }
`;

export const LogoutBtn = styled.a.attrs({ href: "/" })`
  border-radius: 4px;
  color: #ffffff;
  background: #1d1d1d;
  padding: 0 15px;
  text-align: center;
  width: fit-content;
  height: 24px;
  line-height: 24px;
  text-decoration: none;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  margin: 20px;
`;

export const Input = styled.textarea`
  width: 300px;
  height: 25px;
  margin-right: 20px;
  outline: none;
  border: none;
  background: none;
  border-bottom: 3px solid #1d1d1d;
  font-size: 18px;
  font-weight: bold;
  padding: 0 5px;
`;

export const InputBtn = styled.a`
  border-radius: 4px;
  color: #ffffff;
  background: #1d1d1d;
  padding: 2px 15px;
  text-align: center;
  width: fit-content;
  height: 20px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 2px solid #ebbcd3;
  border-radius: 12px;
  margin-top: 20px;
  width: 950px;
  margin-bottom: 90px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  width: 900px;
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  span {
    cursor: pointer;
  }
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
`;

export const Content = styled.div`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  &.finish {
    text-decoration: 3px line-through #1d1d1d;
    color: #ebbcd3;
    font-weight: normal;
    font-style: italic;
  }
`;

export const DeleteBtn = styled.a`
  border-radius: 4px;
  color: #ffffff;
  background: #1d1d1d;
  padding: 2px 15px;
  text-align: center;
  width: fit-content;
  height: 20px;
  line-height: 20px;
  text-decoration: none;
  margin-right: 10px;
  cursor: pointer;
`;

export const ListRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #ebbcd3;
`;

export const ListDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  &.hide {
    display: none;
  }
`;

export const EmptyListWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  background-image: url(${allDonePic});
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  h3 {
    position: absolute;
    top: 30px;
    left: 70px;
  }
`;
