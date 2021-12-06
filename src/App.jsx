import './App.css'; 
import { BrowserRouter, Switch, Route} from "react-router-dom";
// import NavBar
import NavBar from "./NavBarComponent/NavBar"
import Inicio from "./pages/inicio/Inicio"
import Palabra from './pages/components/Palabra';




function App() {
  return (
    <div className="app">
     
      <BrowserRouter>
        <NavBar />
          <Switch>
              <Route exact path="/">
                <Inicio />
              </Route>

              <Route path="/nueva-palabra">
                <Palabra />
              </Route>

          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
