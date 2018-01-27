import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import LivecamContainer from "./LivecamContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/livecams/:hour" component={LivecamContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
