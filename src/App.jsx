import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
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
import ReferralCode from "./components/RefferralCode";
import Withdrawal from "./components/Withdrawl";


export default function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks/:level" element={<TasksPage />} />
        <Route path="/benefitProgram" element={<BenefitProgram />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newsevent" element={<NewsEvents />} />
        <Route path="/referralCode" element={<ReferralCode />} />
        <Route path="/withdrawl" element={ <div className="min-h-screen bg-gradient-to-br from-[#0A1525] via-[#0F1C3F] to-[#1B2C5C]"><Withdrawal></Withdrawal></div>}></Route>
      </Routes>
    </Router>
    
  );
}
