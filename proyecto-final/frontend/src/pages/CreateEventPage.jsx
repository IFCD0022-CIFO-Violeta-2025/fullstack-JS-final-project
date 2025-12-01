import CreateEvent from "../components/CreateEvent"
import Titulo from "../components/Titulo"
import { ThemeContext } from "../contexts/ThemeContext"

function CreateEventPage() {
  const { theme } = useContext(ThemeContext)

  const [preview, setPreview] = useState(
    "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div>
      <Titulo title="Create Event Page" />
      <CreateEvent />
    </div>
  )
}

export default CreateEventPage
