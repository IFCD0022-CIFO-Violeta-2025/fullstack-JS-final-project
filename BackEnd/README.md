## Estructura de proyecto

proyecto/
├── backend
├── frontend
├──.gitignore
└── README.md

backend/
├── package.json
├── .env
└── src/
│ app.js
│ server.js # inicialización
│
├───config # jwt.js, swagger.js
│ jwt.js
│ swagger.js
│
├───controllers
│ authController.js
│ commentController.js
│ eventController.js
│ eventHistoryController.js
│ messageController.js
│ notificationController.js
│ organizerController.js
│ postController.js
│ statsController.js
│ tagController.js
│ userController.js
│ userHistoryController.js
│
├───dataBase # Sequelize init
│ db.js
│ DB_eventos.sql
│ ER_Diagramma_db_eventos.mwb
│
├───middlewares # requireAuth, requireRole
│ authMiddleware.js
│ eventHistoryMiddleware.js
│ roleMiddleware.js
│ userHistoryMiddleware.js
│
├───models # models Sequelize
│ Comment.js
│ Event.js
│ EventParticipant.js
│ EventSubscription.js
│ EventTag.js
│ index.js
│ Location.js
│ Message.js
│ Notification.js
│ Organizer.js
│ Permission.js
│ Post.js
│ Profile.js
│ ProfilePermission.js
│ Tag.js
│ User.js
│ UserHistory.js
│ UserProfile.js
│
├───routes
│ authRoutes.js
│ commentRoutes.js
│ eventHistoryRoutes.js
│ eventRoutes.js
│ index.js
│ messageRoutes.js
│ notificationRoutes.js
│ organizerRoutes.js
│ postRoutes.js
│ statsRoutes.js
│ tagRoutes.js
│ userHistoryRoutes.js
│ userRoutes.js
│
├───seeds # seedAdmin.js, seedModerator.js
│ seedAdmin.js
│ seedModerator.js
│
├───tests
│ api.test.js
│ models.test.js
│ userEventController.test.js
│
├───utils # hashPassword
│ password.js
│
└───validations # Joi-esquemas para cada una de entidades
authSchemas.js
commentSchemas.js
eventSchemas.js
postSchemas.js
tagSchemas.js
userSchemas.js

## instal dependencies

npm install

npm i axios bcryptjs cors dotenv express helmet joi jsonwebtoken morgan mysql2 sequelize

npm i --save-dev nodemon

## iniciamos servidor

node --watch src/server

frontend/
├── package.json
├── .env
├── index.html
└── src/
├── main.jsx
├── App.jsx
├── router.jsx
├── api/axios.js
├── context/AuthContext.jsx
├── components/
│ ├── LoginForm.jsx
│ ├── RegisterForm.jsx
│ ├── PostForm.jsx
│ ├── PostList.jsx
│ ├── EventForm.jsx
│ ├── EventList.jsx
│ └── CommentForm.jsx
└── pages/
├── Home.jsx
├── Login.jsx
├── Register.jsx
├── Profile.jsx
├── Events.jsx
├── Posts.jsx
├── Messages.jsx
└── Notifications.jsx

## Frontend: Vite + React install

react-router-dom
name-project
|
react
|
java
|

npm i react-dom react-router-dom

## iniciamos Front-end

npm run dev

## Descripcion general proecto

## Arquitectura:

• Frontend (Vite + React) — es la interfaz. Recoge los datos de los formularios, llama al backend a través de HTTP (axios), y renderiza el resultado.
• Backend (Express) — es el "servidor" con puertas (rutas). Recibe solicitudes, verifica los permisos (JWT), valida el cuerpo (Joi), procesa los datos (controladores), guarda/lee de la base de datos (Sequelize).
• Base de datos (MySQL) — es el lugar donde se guarda todo de manera permanente.

Ruta del flujo de datos:
React (axios) → Express (routes) → Middleware (verificación de token) → Controller (lógica) → Sequelize (modelos/consultas) → MySQL (guardar/leer) → respuesta de vuelta a través de las mismas capas.

## Backend:

Componentes del backend:
• Express — crea el servidor y las rutas.
• Joi — verifica el formato de los datos recibidos (validación).
• bcryptjs — encripta la contraseña (convierte el texto plano en una cadena segura).
• jsonwebtoken — crea/verifica tokens (JWT) para saber quién es el usuario.
• Sequelize — "ORM", convierte objetos JS en consultas SQL.
• dotenv — lee configuraciones del archivo .env (secretos, contraseñas, claves).

Cómo es un tipo de solicitud
Tomemos "Crear una publicación" como ejemplo del flujo general.

## Dependencias

"dependencies": {
"axios": "^1.13.2", #Cliente HTTP para realizar peticiones a APIs externas (por ejemplo, webhooks, integraciones).
"bcryptjs": "^3.0.3", #Hashing de contraseñas (registro, inicio de sesión) y verificación de hashes.
"cors": "^2.8.5", #Permite peticiones desde el frontend a otro dominio (Cross-Origin Resource Sharing)
"dotenv": "^17.2.3", #Carga variables de entorno desde el archivo .env (por ejemplo, DB, claves JWT).
"express": "^5.1.0", #Framework principal para crear una API REST (rutas, middleware).
"helmet": "^8.1.0", #Protección de cabeceras HTTP (seguridad: XSS, CSP, HSTS, etc.).
"joi": "^18.0.1", #Validación de datos (verificación de formularios, peticiones, tipos, campos obligatorios).
"jsonwebtoken": "^9.0.2", #Creación y verificación de tokens JWT para autorización.
"morgan": "^1.10.1", #Registro de peticiones HTTP en la consola (útil para depuración).
"mysql2": "^3.15.3", #Driver para conectar con MySQL (usado con Sequelize).
"sequelize": "^6.37.7" #ORM para trabajar con la base de datos: modelos, relaciones, consultas, migraciones.
},

### Cómo funccionan juntos:

• **Express** — la base del servidor.
• **Sequelize + mysql2** — ORM para trabajar con MySQL.
• **dotenv** — configuración a través de un archivo .env.
• **helmet + cors + morgan** — seguridad, accesibilidad y registro de peticiones.
• **bcryptjs + jsonwebtoken** — autorización: hash de contraseñas y tokens.
• **joi** — validación de las peticiones.
• **axios** — peticiones a servicios externos (por ejemplo, envío de webhooks).
• **nodemon** — comodidad durante el desarrollo.

---

## Frontend realiza:

Tipo: HTTP POST.
URL: /api/posts.
Headers: { Authorization: "Bearer <JWT token>" } — necesario para que el backend sepa quién eres.
Body: objeto { title: "Título", description: "Texto de la publicación" }.

## Backend recibe:

La ruta de Express captura el POST /posts.
Middleware requireAuth lee el encabezado Authorization, extrae el token y lo verifica (JWT). Si es válido, añade a req.user un objeto de tipo { id_user: 1, roleNames: [...] }.
El Controller (postController.createPost) valida el cuerpo usando Joi: title — obligatorio, cadena corta; description — cadena o vacío.
Si todo es correcto, crea el registro usando Sequelize: Post.create({ title, description, id_user: req.user.id_user }).
Sequelize genera SQL:
Inserta los datos en la tabla posts (INSERT).
Devuelve el objeto de la publicación (objeto JS) con los campos de la base de datos.

Express devuelve la respuesta:
Status: 201 (creado).
Body: objeto de la publicación (JSON), por ejemplo { id_post: 12, title: "...", description: "...", id_user: 1, created_at: "..." }.

## Frontend recibe:

Axios obtiene los datos (objeto), realiza setState, y React renderiza la nueva publicación.

## Tipos de datos en cada paso:

• React: objeto en state y en el cuerpo de la solicitud.
• Axios: envía/recibe objetos JSON.
• Express: req.body (objeto), req.headers (objeto), req.user (objeto con JWT).
• Sequelize: objetos JS "modelos" que se traducen en SQL.
• MySQL: filas de la tabla (datos relacionales) que se devuelven como objetos.

---

**Autenticación: registro e inicio de sesión**

**Frontend envía:**

- **POST /api/auth/register**
- **Body (objeto):**

  - username: cadena
  - email: cadena
  - password: cadena (en texto claro, aún no cifrada)
  - opcionalmente name, last_name

**Backend hace:**

1. Joi verifica los formatos: email — válido, password — mínimo 6 caracteres.
2. Verificación de si el email está ocupado: `User.findOne({ where: { email } })`.
3. **bcryptjs.hash(password)** — obtiene el hash (cadena larga, típicamente ~60 caracteres).
4. **User.create({...})** — guarda al usuario con la contraseña cifrada (nunca guardamos la contraseña en texto claro).
5. Asigna el rol "user" (a través de la tabla `user_roles`).
6. Crea el JWT:

   - `signToken({ id_user: user.id_user, roleNames: ['user'] })`
   - Este es un "token" de tipo cadena.

7. Responde:

   - **Status:** 201
   - **Body (objeto):** `{ token: '<jwt>', user: { id_user, username, email } }`

**Frontend:**

- Guarda el **token** en **localStorage** (como cadena).
- Guarda el **user** en el **contexto** (objeto), para mostrar que el usuario está autenticado.

---

**Inicio de sesión: ¿qué sucede?**

**Frontend:**

- **POST /api/auth/login**
- **Body (objeto):** `{ email, password }`

**Backend:**

1. Encuentra al usuario por **email**.
2. **bcryptjs.compare(plainPassword, user.passwordHash)** — verifica la contraseña.
3. Si todo es correcto, recoge los roles del usuario (un array de cadenas), y firma el JWT.
4. Responde:

   - **Status:** 200
   - **Body:** `{ token, user: { id_user, username, email, roles: [...] } }`

**Frontend:**

- Guarda el **token** y el **user** de la misma manera que al registrarse.

---

**¿Qué es un JWT "por dentro"?**

- Es una cadena que contiene un **payload** cifrado (objeto). Después de **verifyToken**, obtienes ese payload de vuelta como un objeto: `{ id_user: ..., roleNames: [...] }`.

---

Rutas — solo "direcciones" y "direcciones". Por ejemplo, router.post('/posts', requireAuth, createPost):

Datos: no tienen su propia lógica, solo vinculan la URL con el código.

Middleware — "barreras". Por ejemplo, requireAuth:

Toma el encabezado Authorization → extrae el token → verifyToken → coloca el objeto de usuario en req.user.

Si algo está mal, responde con 401 y no deja pasar al siguiente.

Controladores — "guiones". Por ejemplo, postController:

Lee req.body (objeto) → valida (Joi) → llama a los modelos → devuelve un JSON.

Modelos (Sequelize) — "diccionarios" de tablas:

Describen los campos (cadenas, números), tipos y nombres de tablas.

Proporcionan métodos: create/findAll/findOne/update/destroy.

Devuelven objetos JS que corresponden a las filas de la tabla.

## Ejemplos de código:

Autenticación: middleware requireAuth

export const requireAuth = (req, res, next) => {
const auth = req.headers.authorization || ''; // cadena, p. ej. "Bearer abc.def.ghi"
const token = auth.startsWith('Bearer ') ? auth.slice(7) : null; // cortamos el token
if (!token) return res.status(401).json({ error: 'Missing token' });
try {
const payload = verifyToken(token); // payload — objeto { id_user, roleNames }
req.user = payload; // guardamos en req.user
next(); // pasamos al siguiente controlador
} catch {
return res.status(401).json({ error: 'Invalid token' });
}
};

## Tipos de datos:

req.headers — objeto.
req.headers.authorization — cadena.
payload después de verifyToken — objeto.

## Controlador de registro: hash + guardar + token

export const register = async (req, res) => {
const { error, value } = registerSchema.validate(req.body); // req.body — objeto del formulario
if (error) return res.status(400).json({ error: error.details[0].message });

const { username, name, last_name, email, password } = value;

const exists = await User.findOne({ where: { email } });
if (exists) return res.status(409).json({ error: 'Email already registered' });

const pwdHash = await hashPassword(password); // bcrypt → cadena de hash
const user = await User.create({ username, name, last_name, email, password: pwdHash });

// Rol por defecto
let role = await Role.findOne({ where: { name: 'user' } }) || await Role.create({ name: 'user' });
await UserRole.create({ id_user: user.id_user, id_role: role.id_role });

const token = signToken({ id_user: user.id_user, roleNames: ['user'] }); // cadena
return res.status(201).json({ token, user: { id_user: user.id_user, username, email } });
};

## Tipos de datos:

req.body — objeto.
pwdHash — cadena (no un array).
user — objeto del modelo (luego se serializa en JSON).
token — cadena.

## Controlador de posts: crear y obtener lista

export const createPost = async (req, res) => {
const { error, value } = postSchema.validate(req.body); // { title, description }
if (error) return res.status(400).json({ error: error.details[0].message });

const post = await Post.create({ ...value, id_user: req.user.id_user }); // objeto post
return res.status(201).json(post);
};

export const listPosts = async (req, res) => {
const posts = await Post.findAll({
include: [
{ model: User, attributes: ['id_user', 'username'] }, // agrega objeto user
{ model: Comment, attributes: ['id_comment', 'comment'] } // agrega array de objetos comments
],
order: [['id_post', 'DESC']]
});
return res.status(200).json(posts); // posts — array de objetos
};

## Tipos de datos:

req.body — objeto.
createPost devuelve un objeto.
listPosts devuelve un array de objetos, cada uno con un objeto user (objeto) y comments (array).

## Si gusta en el post: par único (id_post, id_user)

export const likePost = async (req, res) => {
const { id } = req.params; // cadena, pero sabemos que es un número id_post
await Like.findOrCreate({ where: { id_post: id, id_user: req.user.id_user } });
return res.status(200).json({ message: 'Liked' });
};

## Tipos de datos:

req.params — objeto { id: '...' }.
Like.findOrCreate — devuelve un array [instance, createdBool], pero no es necesario usarlo si solo nos interesa si está ok.

## Comentario en el post: Joi + crear

const commentSchema = Joi.object({
id_post: Joi.number().integer().required(),
comment: Joi.string().min(1).required()
});

export const addComment = async (req, res) => {
const { error, value } = commentSchema.validate(req.body); // { id_post, comment }
if (error) return res.status(400).json({ error: error.details[0].message });

const c = await Comment.create({ ...value, id_user: req.user.id_user }); // objeto comentario
return res.status(201).json(c);
};

## Tipos de datos:

req.body — objeto.
Comment.create — devuelve un objeto.

## Frontend:

Axios: añadir token a cada solicitud

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL, // cadena, p. ej. http://localhost:3000/api
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem('token'); // cadena o null
if (token) config.headers.Authorization = `Bearer ${token}`; // añadimos el encabezado
return config;
});

## Tipos de datos:

config — objeto.
headers — objeto.
token — cadena.

## Contexto de autenticación: login/registro/logout

const login = async (email, password) => {
const { data } = await api.post('/auth/login', { email, password }); // data — objeto: { token, user }
localStorage.setItem('token', data.token);
setUser(data.user); // user — objeto { id_user, username, email, roles? }
};

const register = async (form) => {
const { data } = await api.post('/auth/register', form);
localStorage.setItem('token', data.token);
setUser(data.user);
};

const logout = () => {
localStorage.removeItem('token');
setUser(null);
};

## Tipos de datos:

form — objeto.
data — objeto.
user en state — objeto o null.

## Componente de creación de post: enviamos un objeto, recibimos un objeto

function PostForm() {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');

const submit = async (e) => {
e.preventDefault();
const { data } = await api.post('/posts', { title, description }); // data — objeto post
// Luego o actualizamos la lista o lo agregamos al array local
};

# return (

# <form onSubmit={submit}>

# <input value={title} onChange={e => setTitle(e.target.value)} />

# <textarea value={description} onChange={e => setDescription(e.target.value)} />

# <button type="submit">Crear</button>

# </form>

# );

# }

## Tipos de datos:

state — cadenas.
Cuerpo de la solicitud — objeto.
Respuesta — objeto del post.

## Componente de lista de posts: recibimos un array, lo renderizamos

function PostList() {
const [posts, setPosts] = useState([]); // array

useEffect(() => {
api.get('/posts').then(res => setPosts(res.data)); // res.data — array de objetos
}, []);

return (

<div>
{posts.map(p => (
<div key={p.id_post}>
<h3>{p.title}</h3>
<p>{p.description}</p>
<small>Автор: {p.User?.username}</small>
{/_ Comentarios: array _/}
{p.Comments?.map(c => <div key={c.id_comment}>• {c.comment}</div>)}
</div>
))}
</div>
);
}

Aquí tienes la traducción al español de tu texto, manteniendo los términos técnicos en inglés:

---

**Tipos de datos:**
• **posts** — es un array.
• Cada **p** — es un objeto.
• **p.User** — es un objeto anidado o undefined.
• **p.Comments** — es un array de objetos anidados.

**Cómo se validan los datos: Joi y errores**
• Joi recibe un objeto (**req.body**) y devuelve:

- o **value** (objeto limpio/validado),
- o **error** (objeto con detalles).
  • Si hay un **error** — se devuelve el código 400 y un mensaje para el usuario.

Ejemplos de mensajes:
• "email" must be a valid email — email no válido.
• "password" length must be at least 6 characters long — contraseña corta.

**Roles y permisos: dónde se encuentran**
• **Roles** — en la tabla **roles**, la relación con el usuario se realiza a través de **user_roles**.
• **Permisos** — en **permissions**, y la relación entre rol y permiso se maneja mediante **role_permissions**.
• Guardamos **roleNames** en el **JWT payload** (array de strings) para que el middleware pueda verificar el acceso rápidamente.

**Verificación de rol (solución simple):**

```
export const requireRole = (...roles) => (req, res, next) => {
  const names = req.user?.roleNames || []; // array de strings
  const ok = names.some(r => roles.includes(r));
  if (!ok) return res.status(403).json({ error: 'Forbidden' });
  next();
};
```

**Lo que es importante recordar en la práctica**
• Las contraseñas nunca se almacenan en texto plano. Solo se guarda el **bcrypt hash** (string).
• **JWT** — es solo una cadena firmada. No pongas información sensible (como la contraseña) allí.
• **req.user** — es tu punto de acceso para los permisos. Si no existe **req.user**, el usuario no está autorizado.
• **Tipos de datos**:

- El **cuerpo del request** siempre es un objeto (JSON).
- Las **respuestas** son un objeto o un array de objetos (JSON).
- **Token** — siempre es un string.
- Los **identificadores** — son números en la base de datos, pero en las rutas (**req.params**) llegan como strings, así que debes convertirlos a **Number(id)** si es necesario.

**Pequeña guía: correspondencia entre capas**
• **React state**: objetos/strings/arrays → recoges el formulario → envías un objeto con **axios**.
• **Axios**: objeto → JSON en el cuerpo → recibe de vuelta un objeto/array.
• **Express**:

- **req.body**: objeto
- **req.params**: objeto (strings)
- **req.headers**: objeto (strings)
- **res.json**: envía objeto/array

  • **Sequelize**:

- **Model.create/findAll**: reciben/retornan objetos de modelo
- **include**: agrega objetos/arrays anidados
  • **MySQL**:
- Guarda strings/números/fechas → **Sequelize** los convierte en objetos de JS para ti.

**“Trazado” de la solicitud:**
Escenario: el usuario inicia sesión y da "like" a un post.

1. **Login**:
   • **React LoginForm** recoge **email/password** (strings) → **axios.post('/auth/login', { email, password })** (objeto).
   • Ruta de **Express**: **/auth/login** → **authController.login** → Joi valida → **User.findOne** → **bcrypt.compare** → recoge **roleNames** → **signToken** (string).
   • Respuesta: `{ token: '...', user: {...} }` — objeto.
   • **React**: **localStorage.setItem('token', string)**, **setUser(objeto)**.

2. **Dar like a un post**:
   • **React**: hace click en "Like" → **axios.post(/posts/${id}/like)** (sin cuerpo).
   • **Axios** agrega el encabezado **Authorization: "Bearer <token>"** (string).
   • Ruta de **Express**: **/posts/:id/like** → **requireAuth** lee el encabezado, **verifyToken** → **req.user** objeto → **postController.likePost** → **Like.findOrCreate({ where: { id_post: id, id_user: req.user.id_user } })**.
   • Respuesta: `{ message: 'Liked' }` — objeto.

**Si el token está expirado/no es válido:**
• **verifyToken** lanzará un error → 401 `{ error: 'Invalid token' }` — objeto con el mensaje.

**Lista de lo que encontrar en el código:**
• **Agregar token en el frontend**: **src/api/axios.js** (interceptors)
• **Guardar usuario**: **src/context/AuthContext.jsx** (login/register/logout)
• **Rutas del backend**: **src/routes/\*.js** (direcciones de la API)
• **Verificación del token**: **src/middlewares/authMiddleware.js** (requireAuth)
• **Hashing y verificación de la contraseña**: **src/utils/password.js** (hashPassword, comparePassword)
• **Creación del token**: **src/config/jwt.js** (signToken, verifyToken)
• **Lógica de autenticación**: **src/controllers/authController.js** (register, login)
• **Posts**: **src/controllers/postController.js** (createPost, listPosts, likePost)
• **Validación**: **src/validations/\*** (esquemas de Joi)
• **Modelos/relaciones**: **src/models/** y **src/models/index.js** (Sequelize)

---

## Entity‑Relationship Diagram

+-------------------+ +-------------------+
| User |1------<| Event |
+-------------------+ +-------------------+
| id, username, ... | | id, title, ... |
+-------------------+ +-------------------+
|1 |_
| |
v v
+-------------------+ +-------------------+
| Post |1------<| Comment |
+-------------------+ +-------------------+
| id, content, ... | | id, content, ... |
+-------------------+ +-------------------+
|_ ^
| |
v |
+-------------------+ |
| Tag |>-------------+
+-------------------+
| id, name |
+-------------------+

+-------------------+ +-------------------+
| Organizer |1------<| Event |
+-------------------+ +-------------------+
| id, name, ... | | id, title, ... |
+-------------------+ +-------------------+

+-------------------+ +-------------------+
| History | | User |
+-------------------+ +-------------------+
| id, action, ... | | id, username, ... |
+-------------------+ +-------------------+
^ ^
| |
+-----------<--------------+
| |
v v
+-------------------+ +-------------------+
| Event | | Post |
+-------------------+ +-------------------+

Modelos y sus relaciones

    User["User"] User -->|"id, username, email, password, role, estado\nTiene muchos Posts, Comments y Events"| User
    Event["Event"] Event -->|"id, título, descripción, fecha, capacidad\nPertenece a un User (organizador), tiene Comments y Tags"| Event
    Post["Post"]Post -->|"id, contenido, imagen, fecha\nPertenece a un User, tiene Comments y Tags"| Post
    Comment["Comment"] Comment -->|"id, contenido, idUser, idPost/idEvent\nPertenece a un User, puede estar en un Post o Event"| Comment
    Tag["Tag"]Tag -->|"id, nombre\nRelación muchos‑a‑muchos con Posts y Events"| Tag
    Organizer["Organizer"]Organizer -->|"id, nombre, contacto\nRelación con Events (quién organiza cada evento)"| Organizer
    History["History"]History -->|"id, acción, fecha, usuario/evento afectado\nGuarda cambios de User y Event para auditoría"| History

• **Usuarios**
o tienen muchas **Posts**, **Comments**, **Messages** (como remitente y receptor), **Notifications**.
o a través de **UserProfiles** están relacionados con **Profiles** (roles).

• **Profiles**
o a través de **ProfilePermissions** están relacionados con **Permissions** (derechos).

• **Events**
o pueden tener muchos **Comments**.
o a través de **EventTags** están relacionados con **Tags**.
o a través de **EventSubscriptions** están relacionados con **Users** (participantes).
o pertenecen a **Organizer** y **Location**.

• **Posts**
o pertenecen a **User**.
o pueden tener muchos **Comments**.

• **Comments**
o pertenecen a **User**.
o pueden estar relacionados con un **Event** o con un **Post**.

• **Messages**
o tienen **idSender** e **idReceiver** → ambos hacen referencia a **User**.

• **Notifications**
o pertenecen a **User**.

• **Relations**
o tabla universal para relaciones arbitrarias (no es obligatoria, ya que ya existen tablas especializadas N:M).

---

## Controlador-model-diagramma

                 +-------------------+
                 |   AuthController  |
                 +-------------------+
                          |
                          v

+-------------------+ +-------------------+
| User |<--->| UserController |
+-------------------+ +-------------------+
| id, username, ... | | CRUD usuarios |
+-------------------+ +-------------------+
| 1.._ ^
| |
v |
+-------------------+ +-------------------+
| Event |<--->| EventController |
+-------------------+ +-------------------+
| id, title, ... | | CRUD eventos |
+-------------------+ +-------------------+
| 1.._ ^
| |
v |
+-------------------+ +-------------------+
| Post |<--->| PostController |
+-------------------+ +-------------------+
| id, content, ... | | CRUD posts |
+-------------------+ +-------------------+
| 1..\* ^
| |
v |
+-------------------+ +-------------------+
| Comment |<--->| CommentController |
+-------------------+ +-------------------+
| id, content, ... | | CRUD comentarios |
+-------------------+ +-------------------+

+-------------------+ +-------------------+
| Tag |<--->| TagController |
+-------------------+ +-------------------+
| id, name | | CRUD etiquetas |
+-------------------+ +-------------------+

+-------------------+ +-------------------+
| Notification |<--->| NotificationCtrl |
+-------------------+ +-------------------+
| id, message, ... | | CRUD notificaciones|
+-------------------+ +-------------------+

+-------------------+ +-------------------+
| Organizer |<--->| OrganizerCtrl |
+-------------------+ +-------------------+
| id, name, ... | | CRUD organizadores|
+-------------------+ +-------------------+

+-------------------+ +-------------------+
| History |<--->| HistoryController |
+-------------------+ +-------------------+
| id, action, ... | | Auditoría cambios |
+-------------------+ +-------------------+

+-------------------+
| StatsController |
+-------------------+
| métricas globales |
+-------------------+

    AuthController["AuthController"] #AuthController -->|"Registro, login JWT, logout, recuperación"| AuthController
    UserController["UserController"] #UserController -->|"CRUD usuarios, estados (banned, news_subscription)"| UserController
    EventController["EventController"]#EventController -->|"CRUD eventos, acceso (subscriptorsOnly, visible)"| EventController
    PostController["PostController"]#PostController -->|"CRUD posts"| PostController
    CommentController["CommentController"]#CommentController -->|"CRUD comentarios (post/event), solo autor/admin/mod"| CommentController
    TagController["TagController"]TagController -->|"CRUD etiquetas, clasificación de posts/eventos"| TagController
    NotificationController["NotificationController"]NotificationController -->|"Crear, listar, marcar leídas, eliminar"| NotificationController
    StatsController["StatsController"]StatsController -->|"Estadísticas generales para panel admin"| StatsController
    OrganizerController["OrganizerController"]OrganizerController -->|"CRUD organizadores, relación con eventos"| OrganizerController
    HistoryController["HistoryController"] HistoryController -->|"Registro de acciones y auditoría"| HistoryController

• **Auth/User**: trabajan con **User**, **Profile**, **UserProfile** para el registro, inicio de sesión y gestión de perfiles.
• **Events/Tags/Subscriptions**: los controladores de eventos gestionan **Event**, **Tag**, **EventTag**, **EventSubscription**, así como los organizadores y ubicaciones.
• **Posts/Comments**: las publicaciones (**Post**) y los comentarios (**Comment**) están vinculados a los usuarios y a los eventos.
• **Messages/Notifications**: los mensajes privados (**Message**) y las notificaciones (**Notification**) siempre están vinculados a los usuarios.
• **Organizer**: controlador separado para la tabla de organizadores.

---

## Asignación los roles y permisos

### Administrador:

src
|
seeds
|
seedAdmin.js --> 4. --> findByPk(1) <--- ID Administrador

#### Ejecutación:

node src/seeds/seedAdmin.js

##### Comprobación:

---

• En la tabla **Profiles** debe haber un registro **admin**.
• En **Permissions** — permisos como **can_delete_users**, **can_edit_events**, etc.
• En **ProfilePermissions** — relaciones entre **admin** y los permisos.
• En **UserProfiles** — relación entre el usuario con **ID = 1** y el rol **admin**.

---

### Moderador:

src
|
seeds
|
seedModerator.js --> 4. --> findByPk(2) <--- ID Moderador

#### Ejecutación:

node src/seeds/seedModerator.js

##### Comprobación:

---

• En la tabla **Profiles** debe haber un registro **moderator**.
• En **Permissions** — el permiso **can_edit_events**.
• En **ProfilePermissions** — relación entre **moderator** y el permiso.
• En **UserProfiles** — relación entre el usuario con **ID = 2** y el rol **moderator**.

---

## Swagger / OpenAPI documentación

### Instalación dependencias

npm install swagger-ui-express swagger-jsdoc

"dependencies": {
"swagger-jsdoc": "^6.2.8",
"swagger-ui-express": "^5.0.1"
},

### Configuración

src
|
config
|
swagger.js

### incorporación en app.js

** Swagger UI **
app.use('/api-docs', swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

#### Obtener documentación

http://localhost:3000/api-docs

#### Deccripción Swagger / OpenAPI

##### Definición

Swagger / OpenAPI es un estándar para describir, documentar y probar APIs REST. Permite definir los endpoints, métodos, parámetros y respuestas de una API en un formato legible tanto por humanos como por máquinas. Con esta especificación se pueden generar documentación interactiva, clientes automáticos y pruebas rápidas de los servicios.

## API Documentation

Este proyecto utiliza **Swagger / OpenAPI** para documentar la API.  
Gracias a esta especificación puedes:

- Explorar los endpoints disponibles.
- Probar las peticiones directamente desde la interfaz.
- Generar clientes y SDKs automáticamente.

La documentación está disponible en `/swagger` o `/docs` al levantar el servidor.

---

1. **swagger-jsdoc** al iniciar el servidor recorre los archivos (por ejemplo, `routes/*.js`) y recoge todos los comentarios `@swagger`.
2. Basado en esos comentarios, genera una especificación JSON de OpenAPI (un gran objeto en la memoria de Node.js).
3. **swagger-ui-express** toma este JSON y lo muestra en el navegador como documentación interactiva.
4. Por enlace `http://localhost:3000/api-docs`, el servidor simplemente entrega este JSON y la interfaz de usuario (UI), por lo que la documentación siempre está actualizada.

---

·

## Comprobación fe fuccionamiento

### POSTMAN

o GET http://localhost:3000/health 
{
    "status": "ok"
}
o POST http://localhost:3000/api/auth/register
o POST http://localhost:3000/api/auth/login
o GET/POST http://localhost:3000/api/events
o GET/POST http://localhost:3000/api/tags
o GET/POST http://localhost:3000/api/posts
o POST http://localhost:3000/api/comments
o POST/GET http://localhost:3000/api/messages
o GET/PUT http://localhost:3000/api/notifications

### Jest + Supertest

Jest es un framework de pruebas en JavaScript que permite escribir y ejecutar tests de forma sencilla, con soporte para mocks, cobertura y aserciones. Supertest es una librería que facilita probar APIs HTTP, permitiendo enviar peticiones y verificar respuestas dentro de los tests.

En conjunto, se usan para realizar tests automatizados de endpoints REST, asegurando que la API funcione correctamente y responda como se espera.

## Testing

Este proyecto utiliza **Jest + Supertest** para pruebas automatizadas:

- **Jest**: framework de testing con soporte para mocks y cobertura.
- **Supertest**: librería para testear endpoints HTTP de forma sencilla.

Ejecuta las pruebas con:

```bash
npm test
```
