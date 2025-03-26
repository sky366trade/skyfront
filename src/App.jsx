import { useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import Deposit from "./components/Deposit";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import BenefitProgram from "./components/BenefitProgram";
import NewsEvents from "./components/NewsEvent";
import TasksPage from "./components/TasksPage";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import VerifyEmail from "./components/VerifyEmail";
export default function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Profile></Profile>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/faq" element={<FAQ></FAQ>}></Route>
          <Route path="/about" element={<About></About>}></Route>

          <Route path="/deposit" element={<Deposit></Deposit>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/tasks/:level" element={<TasksPage />} />
          <Route
            path="/benefitProgram"
            element={<BenefitProgram></BenefitProgram>}
          ></Route>
             <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/login"
            element={<Login setToken={setToken}></Login>}
          ></Route>
            <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/newsevent" element={<NewsEvents></NewsEvents>}></Route>
        </Routes>
      </Router>
    </>
  );
}
