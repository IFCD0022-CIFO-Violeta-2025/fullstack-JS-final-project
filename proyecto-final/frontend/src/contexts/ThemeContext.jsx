import { createContext, useState } from "react"

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  // 🎨 Paleta de colores centralizada
  const COLORS = {
    white: "#FFFFFF",
    black: "#000000",
    darkPrimary: "#131231",
    darkSecondary: "#282554",
    darkAccent: "#362466",
    lightPrimary: "#FDFDFB",
    lightSecondary: "#F0EAFE",
    purpleDark: "#6739E4",
    purpleLight: "#9569FF",
  }

  const theme = {
    navbarBG: isDarkMode ? COLORS.darkAccent : COLORS.darkPrimary,
    navbarBorder: isDarkMode ? "none" : `1px solid ${COLORS.darkSecondary}`,
    sidebarBorder: isDarkMode ? "none" : `1px solid ${COLORS.darkSecondary}`,
    sidebarColor: isDarkMode ? COLORS.darkAccent : COLORS.darkPrimary,

    cardColor: isDarkMode ? COLORS.lightPrimary : COLORS.darkSecondary,
    bodyColor: isDarkMode ? COLORS.lightSecondary : COLORS.darkPrimary,

    titleColor: isDarkMode ? COLORS.black : COLORS.white,
    textColor: isDarkMode ? COLORS.black : COLORS.white,

    etiquetaColor: isDarkMode ? COLORS.purpleDark : COLORS.purpleLight,

    dejarComentario: isDarkMode ? COLORS.lightSecondary : COLORS.lightSecondary,

    boton: {
      base: {
        backgroundColor: isDarkMode ? COLORS.purpleLight : COLORS.purpleDark,
        color: COLORS.white,
        border: "1px solid transparent",
        padding: "0.5rem 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.3s ease, color 0.3s ease",
        margin: "0 8px",
      },
      hover: {
        backgroundColor: COLORS.white,
        color: isDarkMode ? COLORS.darkAccent : COLORS.purpleDark,
        border: isDarkMode ? `1px solid ${COLORS.darkAccent}` : `1px solid ${COLORS.purpleDark}`,
      },
    },

    borderColor: isDarkMode ? COLORS.black : COLORS.white,

    botonNavbar: {
      base: {
        backgroundColor: "transparent",
        color: COLORS.white,
        border: "none",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontWeight: "500",
        transition: "color 0.3s ease",
        margin: "0 8px",
      },
      hover: {
        color: COLORS.purpleLight,
      },
    },
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
