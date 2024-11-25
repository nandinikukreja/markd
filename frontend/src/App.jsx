import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const App = () => {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.text())
  //     .then((data) => setMessage(data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <> 
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
