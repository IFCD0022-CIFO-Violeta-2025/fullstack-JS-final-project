import { useState, useContext, useRef, useCallback } from "react";
import { ThemeContext } from "../contexts/ThemeContext.jsx";
import OkModal from "../assets/modals/okModal.jsx";
import { postJSON } from "../utils/apiclient.js";
import { GoogleMap, Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const GoogleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Función para hacer geocoding inverso (coordenadas → dirección)
const performGeocoding = (lat, lng, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
            callback(results[0].formatted_address);
        } else {
            console.error('Geocoder error:', status);
        }
    });
};

export default function CreateEvent() {
    const [preview, setPreview] = useState("https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg");
    const [organizador, setOrganizador] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [eventName, setEventName] = useState("");
    const [descriptionEvent, setDescriptionEvent] = useState("");
    const [addressEvent, setAddressEvent] = useState("");
    const [latitudeEvent, setLatitudeEvent] = useState("");
    const [longitudeEvent, setLongitudeEvent] = useState("");

    const [startEventDate, setStartEventDate] = useState("");
    const [EndEventDate, setEndEventDate] = useState("");
    const [startEventHour, setStartEventHour] = useState("");
    const [EndEventHour, setEndEventHour] = useState("");
    const [reservationLimitDateEvent, setReservationLimitDateEvent] = useState("");
    const [assistantsMinEvent, setAssistantsMinEvent] = useState("");
    const [assistantsMaxEvent, setAssistantsMaxEvent] = useState("");
    const [errors, setErrors] = useState({});
    const [positiveCreate, setPositiveCreate] = useState(false);

    const [locationMap, setLocationMap] = useState([{ lat: null, lng: null }]);
    const inputRef = useRef(null);

    const autocompleteRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        setErrors({})
        // 🔹 Validamos que el usuario haya escrito algo
        if (organizador.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                organizador: "El nombre del organizador es obligatorio",
            }));
            return;
        }
        if (eventName.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                eventName: "El nombre del evento es obligatorio",
            }));
            return;
        }
        if (descriptionEvent.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                descriptionEvent: "La descripción del evento es obligatoria",
            }));
            return;
        }
        if (addressEvent.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                addressEvent: "La dirección del evento es obligatoria",
            }));
            return;
        }
        if (startEventDate.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                startEventDate: "La fecha de inicio del evento es obligatoria",
            }));
            return;
        }
        if (EndEventDate.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                EndEventDate: "La fecha de fin del evento es obligatoria",
            }));
            return;
        }
        if (reservationLimitDateEvent.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                reservationLimitDateEvent: "La fecha de fin de reserva del evento es obligatoria",
            }));
            return;
        }
        if (assistantsMinEvent.trim() === "" || Number(assistantsMinEvent) < 1) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                assistantsMinEvent: "El número de asistentes es obligatorio",
            }));
            return;
        }
        if (assistantsMaxEvent.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                assistantsMaxEvent: "El número de asistentes es obligatorio",
            }));
            return;
        }

        // Construimos un objeto JSON con los campos del formulario.
        // Nota: si necesitas subir una imagen debes usar FormData y multipart.
        const payload = {
            organizador,
            creation: creationDate,
            title: eventName,
            description: descriptionEvent,
            location: addressEvent,
            latitude: latitudeEvent,
            longitude: longitudeEvent,
            start_date: startEventDate,
            End_date: EndEventDate,
            start_time: startEventHour,
            end_time: EndEventHour,
            reservationLastDate: reservationLimitDateEvent,
            capacityMin: Number(assistantsMinEvent),
            capacityMax: Number(assistantsMaxEvent),
        };

        const apiCreateEvent = async () => {
            try {
                const postCreateEvent = await postJSON('api/v1/events', payload);
                if (postCreateEvent.error) {
                    throw new Error(postCreateEvent.error);
                }
                setPositiveCreate(true);
                // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
            } catch (error) {
                console.error("Error al crear el evento:", error);
                // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
            }
        };
        apiCreateEvent();
    }

     const onPlaceChanged = useCallback(() => {
        if (autocompleteRef.current !== null) {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            setAddressEvent(place.formatted_address);
            setLatitudeEvent(place.geometry.location.lat());
            setLongitudeEvent(place.geometry.location.lng());
            setLocationMap({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
            });
        }
        }
    }, []);
    
    
    const {theme} = useContext(ThemeContext);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

     const onMapClick = useCallback((e) => {
        setLocationMap({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setLatitudeEvent(e.latLng.lat());
        setLongitudeEvent(e.latLng.lng());
        // Hacer geocoding inverso para obtener la dirección
        performGeocoding(e.latLng.lat(), e.latLng.lng(), (address) => {
            setAddressEvent(address);
            if (inputRef.current) {
                inputRef.current.value = address;
            }
        });
    }, []);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleApiKey,
        libraries: ['places']
    });

    if (!isLoaded) return <div>Cargando mapa...</div>;

    return (
        <div className="container mt-4" style={{color: theme.textColor}}>
            <form onSubmit={handleSubmit}>
                <div className="row align-items-end">
                    <div className="col-md-4 text-center">
                        <label htmlFor="imagenEvento">
                            <img
                                src={preview}
                                alt="Click para subir"
                                className="img-fluid"
                                style={{ cursor: "pointer", maxHeight: "200px" }}
                            />
                        </label>
                        <input
                            type="file"
                            id="imagenEvento"
                            name="imagenEvento"
                            accept="image/*"
                            className="d-none"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="organizador" className="form-label">Organizador</label>
                        <input type="text" className="form-control" id="organizador" name="organizador"
                            placeholder="Nombre del organizador" 
                            value={organizador}
                            onChange={(e) => setOrganizador(e.target.value)}
                            required
                            />
                            {errors.organizador && <div className="text-danger">{errors.organizador}</div>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="fechaCreacion" className="form-label">Fecha Creación evento</label>
                        <input type="date" className="form-control" id="fechaCreacion" name="fechaCreacion"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)} 
                        required />
                        {errors.creationDate && <div className="text-danger">{errors.creationDate}</div>}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="nombreEvento" className="form-label">Nombre del Evento</label>
                    <input type="text" className="form-control" id="nombreEvento" name="nombreEvento"
                        placeholder="Nombre del evento" 
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required />
                        {errors.eventName && <div className="text-danger">{errors.eventName}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                    <textarea className="form-control" id="descripcion" name="descripcion" 
                    value={descriptionEvent}
                    onChange={(e) => setDescriptionEvent(e.target.value)}
                    required rows="3"
                        placeholder="Descripcion"></textarea>
                    {errors.descriptionEvent && <div className="text-danger">{errors.descriptionEvent}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>                        
                    <Autocomplete
                        onLoad={(autocomplete) => {
                            autocompleteRef.current = autocomplete;
                        }}
                        onPlaceChanged={onPlaceChanged}
                        >
                        <input
                            type="text"
                            placeholder="Buscar ubicación..."
                            ref={inputRef}
                            style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                            }}
                        />
                    </Autocomplete>
                    {errors.addressEvent && <div className="text-danger">{errors.addressEvent}</div>}
                    <GoogleMap
                        onClick={onMapClick}
                        mapContainerStyle={{ height: "300px", width: "100%" }}
                        center={locationMap.lat && locationMap.lng ? locationMap : { lat: 40.4168, lng: -3.7038 }} // Default to Madrid if no location
                        zoom={locationMap.lat && locationMap.lng ? 15 : 5}
                    >
                        {/* Puedes agregar marcadores u otros componentes aquí */}
                    </GoogleMap>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                        <input type="date" className="form-control" id="fechaInicio" name="fechaInicio" 
                        value={startEventDate}
                        onChange={(e) => setStartEventDate(e.target.value)}
                        required />
                        {errors.startEventDate && <div className="text-danger">{errors.startEventDate}</div>}
                    </div>
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="fechaFin" className="form-label">Fecha Fin</label>
                        <input type="date" className="form-control" id="fechaFin" name="fechaFin" 
                        value={EndEventDate}
                        onChange={(e) => setEndEventDate(e.target.value)}
                        required />
                        {errors.EndEventDate && <div className="text-danger">{errors.EndEventDate}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="horaInicio" className="form-label">Hora Inicio</label>
                        <input type="time" className="form-control" id="horaInicio" name="horaInicio" 
                        value={startEventHour}
                        onChange={(e) => setStartEventHour(e.target.value)}
                        required />
                        {errors.startEventHour && <div className="text-danger">{errors.startEventHour}</div>}
                    </div>
                    <div className="mb-3 col col-sm-6 col-md-4 col-lg-3">
                        <label htmlFor="horaFin" className="form-label">Hora Fin</label>
                        <input type="time" className="form-control" id="horaFin" name="horaFin" 
                        value={EndEventHour}
                        onChange={(e) => setEndEventHour(e.target.value)}
                        required />
                        {errors.EndEventHour && <div className="text-danger">{errors.EndEventHour}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label htmlFor="fechaLimite" className="form-label">Fecha Limite reserva</label>
                        <input type="date" className="form-control" id="fechaLimite" name="fechaLimite" 
                        value={reservationLimitDateEvent}
                        onChange={(e) => setReservationLimitDateEvent(e.target.value)}
                        required />
                        {errors.reservationLimitDateEvent && <div className="text-danger">{errors.reservationLimitDateEvent}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label htmlFor="minimoAsistentes" className="form-label">Numero minimo de asistentes</label>
                        <input type="number" className="form-control" id="minimoAsistentes" name="minimoAsistentes"
                            value={assistantsMinEvent}
                            onChange={(e) => setAssistantsMinEvent(e.target.value)}
                            placeholder="1" required min="1" />
                            {errors.assistantsMinEvent && <div className="text-danger">{errors.assistantsMinEvent}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <label htmlFor="maximoAsistentes" className="form-label">Numero máximo de asistentes</label>
                        <input type="number" className="form-control" id="maximoAsistentes" name="maximoAsistentes"
                            value={assistantsMaxEvent}
                            onChange={(e) => setAssistantsMaxEvent(e.target.value)}
                            placeholder="1" required min="1" />
                            {errors.assistantsMaxEvent && <div className="text-danger">{errors.assistantsMaxEvent}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col col-sm-12 col-md-8 col-lg-6">
                        <button type="submit" className="btn btn-primary w-100">Crear Evento</button>
                    </div>
                </div>
            </form>
             { positiveCreate && (
                <OkModal
                    title={'Evento creado con éxito'}
                />
            )}
        </div>
    );
}