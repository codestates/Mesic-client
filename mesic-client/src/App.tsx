import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import MainPage from "./pages/MainPage";

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
