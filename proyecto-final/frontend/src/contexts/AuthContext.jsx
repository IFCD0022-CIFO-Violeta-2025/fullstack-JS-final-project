import { createContext, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = () => setUser({ name: "Juan" })
  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
