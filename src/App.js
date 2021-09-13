import {BrowserRouter as Router,Route} from "react-router-dom"
import Candidate from "./Component/Candidate"
import DisplayCandidate from "./Component/DisplayCandidate"
import Login from "./Component/Login"

function App(Props) {
  return (
    <div>
      <Router>
      <Route
        strict
        exact
        component={Candidate}
        path="/addcandidate"
        history={Props.history}
      ></Route>
       <Route
        strict
        exact
        component={DisplayCandidate}
        path="/displaycandidate"
        history={Props.history}
      ></Route>
       <Route
        strict
        exact
        component={Login}
        path="/login"
        history={Props.history}
      ></Route>
      
      </Router>
    </div>
  );
}
export default App;


