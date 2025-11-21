import React, { createContext, useState } from "react"

// Crear context
export const EventContext = createContext()

export const EventProvider = ({ children }) => {
    const [eventos, setEventos] = useState([])

    const agregarEvento = (evento) => {
    const eventoConId = { ...evento, id: Date.now() } // ID único
    setEventos((prev) => [...prev, eventoConId])
    }

    return (
    <EventContext.Provider value={{ eventos, agregarEvento }}>
        {children}
    </EventContext.Provider>
    )
}