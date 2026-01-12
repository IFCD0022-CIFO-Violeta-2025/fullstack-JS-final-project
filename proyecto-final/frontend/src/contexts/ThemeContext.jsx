import { createContext, useState } from "react"

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  // Paleta de colores centralizada
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
    orange: "#eb8500ff",
  }

  const theme = {
    white: COLORS.white,
    navbarBG: isDarkMode ? COLORS.darkAccent : COLORS.darkPrimary,
    navbarBorder: isDarkMode ? "none" : `1px solid ${COLORS.darkSecondary}`,
    sidebarBorder: isDarkMode ? "none" : `1px solid ${COLORS.darkSecondary}`,
    sidebarColor: isDarkMode ? COLORS.darkAccent : COLORS.darkPrimary,

    cardColor: isDarkMode ? COLORS.lightPrimary : COLORS.darkSecondary,
    bodyColor: isDarkMode ? COLORS.lightSecondary : COLORS.darkPrimary,

    titleColor: isDarkMode ? COLORS.black : COLORS.white,
    textColor: isDarkMode ? COLORS.black : COLORS.white,

    etiquetaColor: isDarkMode ? COLORS.orange : COLORS.orange,

    dejarComentario: isDarkMode ? COLORS.lightSecondary : COLORS.lightSecondary,

    purple: isDarkMode ? COLORS.purpleLight : COLORS.purpleLight,

    up: isDarkMode ? COLORS.darkAccent : COLORS.purpleDark,

    boton: {
      base: {
        backgroundColor: isDarkMode ? COLORS.purpleLight : COLORS.purpleDark,
        color: COLORS.white,
      },
      hover: {
        backgroundColor: COLORS.orange,
        color: COLORS.white,
      },
    },

    borderColor: isDarkMode ? COLORS.black : COLORS.white,

    botonNavbar: {
      base: {
        color: COLORS.white,
      },
      hover: {
        color: COLORS.orange,
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
