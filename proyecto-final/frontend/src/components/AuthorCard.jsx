//import { ThemeContext } from "../contexts/ThemeContext"



export function AuthorCard (author) {
    console.log("author", author.author.nombre)
    return(
        <>
        <div>
            <div>
                <img src={author.author.image} alt="persona-image" />
            </div>
            <div>
                <p>{author.author.nombre}</p>
            </div>
        </div>
        </>
    )
}