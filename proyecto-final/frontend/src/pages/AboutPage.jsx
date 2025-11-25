import { ThemeContext } from "../contexts/ThemeContext"
import { useContext } from "react"
import { AuthorCard } from "../components/AuthorCard"

const mockData = [
    {
        id: 1,
        nombre:"kkk",
        image: "url",
    },
    {
        id: 2,
        nombre:"kkk",
        image: "url",
    },
    {
        id: 3,
        nombre:"kkk",
        image: "url",
    },
    {       
        id: 4,
        nombre:"kkk",
        image: "url",
    },
    {
        id: 5,
        nombre:"kkk",
        image: "url",
    }
]

export function AboutPage () {
      const { theme } = useContext(ThemeContext)
      const listAuthor = mockData.map((author) => < AuthorCard author = {author} key = {author.id}/>)
      console.log(listAuthor)
    return (
        <>
        <div
        style={{
        minHeight: "80vh",
        backgroundColor: theme.bodyColor,
        color: theme.textColor,
        padding: "2rem",
      }}>

        </div>
        <p>Sombre nosotros</p>
        <div>{listAuthor}</div>
        </>
    )
}