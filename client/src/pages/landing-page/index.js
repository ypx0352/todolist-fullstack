import {
  PageWrapper,
  Pic,
  SignInUpContainer,
  StyledH1,
  StyledP,
  Btn,
  BtnContainer,
} from "./style";

const LandingPage = () => {
  return (
    <PageWrapper>
      <Pic />
      <SignInUpContainer>
        <StyledH1>
          Success starts with defining and documenting the end goal
        </StyledH1>
        <StyledP>Making an effective action plan today.</StyledP>
        <BtnContainer>
          <Btn href="/login">Get started</Btn>
          {/* if users choose to remember their accounts, provide the button letting users login without email and password.  */}
          {localStorage.getItem("name") ? (
            <Btn href="/list">Continue As {localStorage.getItem("name")}</Btn>
          ) : (
            ""
          )}
        </BtnContainer>
      </SignInUpContainer>
    </PageWrapper>
  );
};

export default LandingPage;
