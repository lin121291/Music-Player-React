import { signInWithGoogle } from "./components/firebase";
import GoogleButton from "react-google-button";
import styled from "styled-components";

const Login = () => {
  return (
    <Div>
      <img src={require("./assets/login.png")} alt="Background" />
      <GoogleButton onClick={signInWithGoogle} />
    </Div>
  );
};

export default Login;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
