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
/* import ChatPage from "./pages/ChatPage" */
import Footer from "./components/Footer"
import MyEvents from "./pages/MyEvents"
import WebHistoryPage from "./pages/WebHistoryPage"
import RequireAuth from "./components/RequireAuth"

import NormativaPages from "./pages/NormativaPages"
import PrivacidadPage from "./pages/PrivacidadPage"
import CookiesPage from "./pages/CookiesPage"
import CookieConsent from "./components/CookieConsent"

function App() {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    document.body.style.backgroundColor = theme.bodyColor
  }, [theme.bodyColor])

  return (
    <>
      {/* CookieConsent se muestra primero y bloquea si no se acepta */}

      <CookieConsent />

      <Navbar />
      <Sidebar />

      <div className="layout-wrapper">
        <div className="main-content">
          <div className="main-content__inner">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/event/:id" element={<EventPage />} /> */}
              <Route path="/my-events" element={<MyEvents />} />

              <Route path="/history" element={<WebHistoryPage />} />
              <Route path="/faq" element={<FAQPage />} />
              {/* <Route path="/chat" element={<ChatPage />} /> */}

              {/* Protected routes: require auth to access */}
              <Route element={<RequireAuth />}>
                <Route path="/create" element={<CreateEventPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/event" element={<EventPage />} />
                {/* <Route path="/chat" element={<ChatPage />} /> */}
              </Route>

              {/* footer */}
              <Route path="/normativa" element={<NormativaPages />} />
              <Route path="/privacidad" element={<PrivacidadPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
