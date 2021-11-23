import styled from "styled-components";
import pic from "../../asset/pic/landing-page-pic.png";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1024px;
  margin: 50px auto;
  padding: 50px;
  justify-content: space-between;
  align-items: start;
  background: #f7f8fc;
  font-family: "Inter", "Gill Sans", sans-serif;
  border-radius: 30px;
`;

export const Pic = styled.img.attrs({ alt: "pic", src: pic })`
  order: 2;
  width: 500px;
  border-radius: 15px;
`;
export const SignInUpContainer = styled.div`
  order: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 10px;
`;

export const StyledH1 = styled.h1`
  margin: -1px 0;
  font-size: 32px;
  line-height: 50px;
  color: #1a1a1a;
`;

export const StyledP = styled.p`
  font-size: 20px;
  letter-spacing: 0.01em;
  word-wrap: break-word;
  color: #777;
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
  margin-right: 10px;
`;

export const BtnContainer = styled.div`
  display: flex;
`;
