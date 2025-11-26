//import { ThemeContext } from "../contexts/ThemeContext"



export function AuthorCard (author) {
    console.log("author", author.author.nombre)
    return(
        <>
        <div class="card" style={{width: "18rem"}}>
  <img src={author.author.image} alt="persona-image" />
  <div class="card-body">
    <h5 class="card-title">{author.author.nombre}</h5>
    <p class="card-text"> {author.author.discription} </p>
  </div>
</div>
        </>
    )
}