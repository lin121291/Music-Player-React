import Login from "./pages/Login";
import Home from "./pages/Home";
import firebase from "./pages/Login/components/firebase";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  console.log(user);

  return <div>{user ? <Home /> : <Login />}</div>;
}

export default App;
