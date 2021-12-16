import "./client-side/static/css/common.css";
import Header from "./client-side/components/Header";
import Footer from "./client-side/components/Footer";
import Home from "./client-side/components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function ClientSide() {
  return (
    <div id="client-side">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default ClientSide;
