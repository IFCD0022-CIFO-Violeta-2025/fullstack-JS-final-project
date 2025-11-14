import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProfilePage from "./pages/ProfilePage";
import FAQPage from "./pages/FAQPage";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = theme.bodyColor;
  }, [theme.bodyColor]);

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </>
  )


}

export default App;