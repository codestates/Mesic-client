import React, { useState } from "react";
import "./style.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import MainPage from "./pages/MainPage";
import Nav from "./components/UI/Nav";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/mainpage" component={MainPage} />
      </Switch>
    </Router>
  );
}

export default App;
