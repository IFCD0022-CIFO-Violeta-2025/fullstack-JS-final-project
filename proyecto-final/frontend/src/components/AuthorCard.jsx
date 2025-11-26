import { ThemeContext } from "../contexts/ThemeContext"
import { useContext } from "react"


export function AuthorCard (author) {
      const { theme } = useContext(ThemeContext)
    console.log("author", author.author.nombre)
    return(
        <>
        <div className="card" style={{
            width: "18rem",
             backgroundColor: theme.cardColor,
             color: theme.textColor,
          maxWidth: "450px",
          minWidth: "250px",
          boxShadow: "6px 6px 12px rgba(0, 0, 0, 0.15)"
        }}>

  <img src={author.author.image} alt="persona-image" style={{ padding: "4vw", borderRadius: "12px" }}/>
  
  <div className="card-body">
    <h5 className="card-title">{author.author.nombre}</h5>
    <p className="card-text"> {author.author.discription} </p>
  </div>
</div>
        </>
    )
}