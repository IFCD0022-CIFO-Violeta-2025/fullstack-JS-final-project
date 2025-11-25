import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeContext } from "./contexts/ThemeContext"
import Navbar from "./components/Navbar"
import Sidebar from "./components/SideBar"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import EventPage from "./pages/EventPage"
import CreateEventPage from "./pages/CreateEventPage"
import ProfilePage from "./pages/ProfilePage"
import FAQPage from "./pages/FAQPage"
import ChatPage from "./pages/ChatPage"
import RequireAuth from "./components/RequireAuth"

function App() {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    document.body.style.backgroundColor = theme.bodyColor
  }, [theme.bodyColor])

  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="main-content">
        <div className="main-content__inner">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/event" element={<EventPage />} />

            {/* Protected routes: require auth to access */}
            <Route element={<RequireAuth />}>
              <Route path="/create" element={<CreateEventPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>

            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
