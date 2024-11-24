import React, { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">{message}</h1>
    </>
  );
};

export default App;
