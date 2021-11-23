import styled from "styled-components";
import loginPagePic from '../../asset/pic/login-page-pic-2.png'

export const PageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 1024px;
  height: 280px;
  margin: 50px auto;
  padding: 50px;
  justify-content: space-between;
  align-items: start;
  background: #f7f8fc;
  font-family: "Inter", "Gill Sans", sans-serif;
  border-radius: 30px;
  background-image: url(${loginPagePic});
  background-opacity: 50%;
  background-position: 50% 40%;
  background-repeat:no-repeat;
  background-size: 350px 210px;
  
`;

export const ChooseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  width: 424px;
  height: 280px;
  background: #ebbcd3;
  padding: 0 10px;
  box-sizing: border-box;
  transition: all 1.3s;
  z-index: 2;
  &.right {
    transform: translateX(700px);
  }
`;

export const FunctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 700px;
  height: 280px;
  //background: #fff;
  order: -1;
  transition: all 1.5s;
  z-index: 1;
  //   border: 1px solid blue;
  &.left {
    transform: translateX(-424px);
  }
`;

export const StyledH1 = styled.h1`
  margin: 0;
  font-size: 32px;
  line-height: 50px;
  color: #1a1a1a;
  text-align: center;
`;

export const StyledP = styled.p`
  font-size: 16px;
  letter-spacing: 0.01em;
  word-wrap: break-word;
  color: #777;
  text-align: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  height: 150px;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const InputItemWrapper = styled.div`
  span {
    &.icon-show-password1 {
      cursor: pointer;
    }
    &.icon-show-password {
      cursor: pointer;
    }
  }
`;

export const InputItem = styled.input`
  margin: 0 5px;
  background: #ebbcd3;
  border: none;
  outline: none;
  border-bottom: 2px solid #ebbcd3;
  color: #777;
  line-height: 30px;
  font-size: 12px;
  font-weight: bold;
  width: 250px;
  ::placeholder {
    font-family: "Inter", "Gill Sans", sans-serif;
    color: #777;
    font-size: 12px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ebbcd3;
  font-weight: bold;
  span {
    color: black;
    font-weight: normal;
  }
  &.hide {
    display: none;
  }
`;

export const Btn = styled.a`
  border-radius: 4px;
  color: #ffffff;
  background: #1d1d1d;
  padding: 0 15px;
  text-align: center;
  width: fit-content;
  height: 34px;
  line-height: 34px;
  margin-top: 30px;
  text-decoration: none;
  cursor: pointer;
`;

export const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.input.attrs({ type: "checkbox" })`
  cursor: pointer;
  margin-right:5px;
`;
