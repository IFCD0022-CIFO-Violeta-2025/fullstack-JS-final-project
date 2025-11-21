import React from "react"
import { eventoList } from "../data/mockData"
import Card from "./Card"

const EventList = () => {
    return (
    <div
        className="d-flex flex-wrap justify-content-center"
        style={{ gap: "2rem", padding: "2rem" }}
    >
    {eventoList.map((evento, index) => (
        <Card key={index} evento={evento} />
    ))}
    </div>
    )
}

export default EventList