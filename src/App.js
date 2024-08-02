import "./App.css";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Counter from "../src/pages/Counter";
import Login from "./pages/Login";
import Home from "./pages/HomeView";
import LoginPage from "./pages/loginPage";
import Landing from "./pages/LandingPage";
import Cart from "./pages/Counter";
import Content from "./pages/Content.tsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

setupIonicReact();

function App() {
  return (
      <Router>
        <Routes >
          <Route path="/" element={<Login/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/counter" element={<Counter/>} />
          <Route path="/content" element={<Content/>} />
        </Routes>
      </Router>
  );
}

export default App;
