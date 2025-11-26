import { ThemeContext } from "../contexts/ThemeContext"
import { useContext } from "react"
import { AuthorCard } from "../components/AuthorCard"
import image from "../../public/monster.svg"

const mockData = [
    {
        id: 1,
        nombre:"kkk",
        image: image,
        discription: "Cursus lectus aenean integer sapien nec integer orci, cras ornare vel odio. Est. Sed pellentesque sit dictum hac ipsum lacinia elit. Libero, tempus velit sodales dictum. Dictum. Dui nunc arcu vitae vulputate elit. Non risus interdum interdum ex. Sit dictum. Aenean velit amet, habitasse consectetur c"
    },
    {
        id: 2,
        nombre:"kkk",
        image: image,
         discription: "Cursus lectus aenean integer sapien nec integer orci, cras ornare vel odio. Est. Sed pellentesque sit dictum hac ipsum lacinia elit. Libero, tempus velit sodales dictum. Dictum. Dui nunc arcu vitae vulputate elit. Non risus interdum interdum ex. Sit dictum. Aenean velit amet, habitasse consectetur c"
    },
    {
        id: 3,
        nombre:"kkk",
        image: image,
         discription: "Cursus lectus aenean integer sapien nec integer orci, cras ornare vel odio. Est. Sed pellentesque sit dictum hac ipsum lacinia elit. Libero, tempus velit sodales dictum. Dictum. Dui nunc arcu vitae vulputate elit. Non risus interdum interdum ex. Sit dictum. Aenean velit amet, habitasse consectetur c"

    },
    {       
        id: 4,
        nombre:"kkk",
        image: image,
         discription: "Cursus lectus aenean integer sapien nec integer orci, cras ornare vel odio. Est. Sed pellentesque sit dictum hac ipsum lacinia elit. Libero, tempus velit sodales dictum. Dictum. Dui nunc arcu vitae vulputate elit. Non risus interdum interdum ex. Sit dictum. Aenean velit amet, habitasse consectetur c"
    },
    {
        id: 5,
        nombre:"kkk",
        image: image,
         discription: "Cursus lectus aenean integer sapien nec integer orci, cras ornare vel odio. Est. Sed pellentesque sit dictum hac ipsum lacinia elit. Libero, tempus velit sodales dictum. Dictum. Dui nunc arcu vitae vulputate elit. Non risus interdum interdum ex. Sit dictum. Aenean velit amet, habitasse consectetur c"
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
        <div className="d-flex flex-wrap flex-row-reverse justify-content-evenly">
{listAuthor}</div>
        </>
    )
}