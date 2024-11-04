import React, { useState } from "react";
import AuthPage from "./pages/AuthPage";
import SetupPage from "./pages/SetupPage";
import GamePage from "./pages/GamePage";
import "./styles/app.css";

const App = () => {
  const [page, setPage] = useState("auth");

  const navigateTo = (pageName) => {
    setPage(pageName);
  };

  return (
    <div className="app-container">
      {page === "auth" && <AuthPage navigateTo={navigateTo} />}
      {page === "setup" && <GamePage navigateTo={navigateTo} />}
      {page === "game" && <GamePage />}
    </div>
  );
};

export default App;
