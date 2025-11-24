/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react"

export const EventContext = createContext()

export const EventProvider = ({ children }) => {
const [eventos, setEventos] = useState([])

const agregarEvento = (evento) => {
    const eventoConId = { ...evento, id: Date.now() }
    setEventos((prev) => [...prev, eventoConId])
}

return (
    <EventContext.Provider value={{ eventos, agregarEvento }}>
        {children}
    </EventContext.Provider>
    )
}