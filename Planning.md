# Planning Proyecto Final - React + Node.js + MySQL

--- 3 semanas

## **ESTRUCTURA DE GRUPOS**

### **Grupo 1: Backend API (3 personas)**
- Diseño y desarrollo de la API REST con Node.js/Express
- Configuración de base de datos MySQL
- Implementación de autenticación y autorización

### **Grupo 2: Frontend Core (3 personas)**
- Estructura base de React
- Routing y navegación
- Componentes compartidos y layout principal

### **Grupo 3: Frontend Features (3 personas)**
- Funcionalidades específicas de usuario
- Formularios y validaciones
- Integración con API

### **Grupo 4: DevOps & Documentación (2 personas)**
- Configuración de GitHub y gestión del repositorio
- Documentación técnica del proyecto
- Preparación y ejecución del deployment final

---

## **CRONOGRAMA - 3 SEMANAS**

### **SEMANA 1: Setup & Planificación (Días 1-5)**

#### **Días 1-2: Kick-off y Setup**

**Todos juntos:**
- Definición del proyecto (tipo de aplicación: e-commerce, blog, dashboard, sistema de gestión, etc.)
- Arquitectura general y stack técnico
- Creación del repositorio principal en GitHub
- Setup de la estructura de branches y protecciones
- Configuración de GitHub Projects/Issues para tracking

**Por grupos:**

**Backend API:**
- Diseño del schema de base de datos (ERD - Diagrama Entidad-Relación)
- Definición de endpoints principales
- Planificación de modelos y controladores

**Frontend Core:**
- Wireframes y mockups básicos
- Estructura de componentes
- Definición de rutas principales

**Frontend Features:**
- Especificación detallada de funcionalidades
- Listado de formularios necesarios
- Flujos de usuario

**DevOps & Documentación:**
- Setup de entorno de desarrollo (instrucciones)
- Configuración de ESLint/Prettier
- Estructura inicial del README
- Scripts de package.json

#### **Días 3-5: Desarrollo Base**

**Backend API:**
- Configuración inicial de Express + conexión a MySQL
- Estructura de carpetas (routes, controllers, models, middlewares)
- Implementación de endpoints básicos (CRUD de al menos 2 entidades principales)
- Middleware de autenticación básica (JWT)

**Frontend Core:**
- Inicialización del proyecto React (Create React App / Vite)
- Configuración de React Router
- Layout principal (Header, Footer, Navigation)
- Context API o Redux para estado global básico
- Axios/Fetch setup para llamadas API

**Frontend Features:**
- Desarrollo de 2-3 componentes principales (con mock data)
- Diseño de formularios principales
- Componentes de UI básicos (cards, buttons, inputs personalizados)

**DevOps & Documentación:**
- Documentación de setup inicial en README
- Guía de instalación y ejecución local
- Convenciones de código del equipo
- Template de Pull Request

** Entregable Semana 1:** MVP básico funcional en local (Backend + Frontend sin integrar completamente)

---

### **SEMANA 2: Desarrollo e Integración (Días 6-10)**

#### **Días 6-8: Desarrollo Intensivo**

**Backend API:**
- Completar todos los endpoints necesarios para el proyecto
- Validaciones de datos (express-validator u otro)
- Manejo robusto de errores
- Implementación de relaciones entre tablas MySQL
- Middleware de autorización por roles (si aplica)

**Frontend Core:**
- Sistema de autenticación completo (Login/Registro/Logout)
- Protección de rutas privadas
- Manejo de estado global completo (usuario, sesión, etc.)
- Componentes reutilizables finalizados
- Sistema de notificaciones/alertas

**Frontend Features:**
- Implementar todas las funcionalidades principales
- Integración real con API (reemplazar mocks)
- Manejo de estados de carga (loaders/spinners)
- Manejo de errores y mensajes al usuario
- Validaciones de formularios

**DevOps & Documentación:**
- Review activo de Pull Requests
- Resolución de merge conflicts
- Documentación de API (endpoints, parámetros, respuestas)
- Variables de entorno (.env.example)

#### **Días 9-10: Integración y Bug Fixing**

**Todos los grupos:**
- Integración completa Frontend-Backend
- Pruebas manuales de todos los flujos principales
- Identificación y corrección de bugs
- Code review cruzado entre grupos
- Refinamiento de la experiencia de usuario

** Entregable Semana 2:** Aplicación completamente funcional con todas las features principales implementadas

---

### **SEMANA 3: Refinamiento y Deployment (Días 11-15)**

#### **Días 11-13: Pulido y Mejoras**

**Backend API:**
- Optimización de queries SQL
- Implementación de paginación en listados
- Filtros y búsquedas
- Documentación completa de API (Postman Collection o Swagger)
- Preparación para producción (variables de entorno, seguridad)

**Frontend Core + Features:**
- Responsive design completo (mobile, tablet, desktop)
- Mejoras de UX/UI
- Loading states y feedback visual mejorado
- Validaciones avanzadas en formularios
- Manejo de casos edge (datos vacíos, errores de red, etc.)
- Optimización de rendimiento

**DevOps & Documentación:**
- README completo con instrucciones detalladas
- Documentación de arquitectura del proyecto
- Diagrama de base de datos incluido
- Guía de deployment
- Changelog del proyecto

#### **Días 14-15: Deployment y Presentación**

**Deployment:**

**Backend:**
- Opciones: Railway, Render, Heroku, AWS (EC2), Digital Ocean
- Configurar variables de entorno en producción
- Deploy de la API

**Base de Datos:**
- Opciones: Railway (MySQL), PlanetScale, AWS RDS, Clever Cloud
- Migración del schema
- Carga de datos iniciales si es necesario

**Frontend:**
- Opciones: Vercel, Netlify, GitHub Pages (si es SPA puro)
- Configurar variables de entorno (API URL)
- Build de producción
- Deploy

**Preparación de Presentación:**
- Demo funcional de la aplicación desplegada
- Presentación técnica (arquitectura, decisiones técnicas)
- Slides explicativos
- Reparto de secciones entre miembros del equipo

** Entregable Final:**
- Aplicación desplegada y funcionando en producción
- Repositorio GitHub completo y documentado
- Presentación del proyecto

---

## **ESTRATEGIA DE TRABAJO CON GITHUB**

### **Estructura de Branches**

```
main (producción - PROTEGIDA)
├── develop (integración - PROTEGIDA)
    ├── feature/backend-auth
    ├── feature/backend-users-crud
    ├── feature/backend-products
    ├── feature/frontend-login
    ├── feature/frontend-dashboard
    ├── feature/frontend-product-list
    ├── fix/bug-nombre-descriptivo
    └── ...
```

### **Reglas**

1. **NUNCA** hacer commit directo a `main` o `develop`
2. Cada nueva funcionalidad o fix = 1 branch nueva desde `develop`
3. Nomenclatura obligatoria:
   - Features: `feature/nombre-descriptivo`
   - Fixes: `fix/descripcion-del-bug`
   - Docs: `docs/que-se-documenta`
4. Pull Request (PR) obligatorio para merge a `develop`
5. **Mínimo 1 review aprobado** de otro compañero antes de hacer merge
6. Al final de cada semana: merge de `develop` a `main` (supervisión)

### **Workflow Diario**

1. Actualizar tu rama develop local:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Crear nueva branch para tu tarea:
   ```bash
   git checkout -b feature/mi-nueva-funcionalidad
   ```

3. Desarrollar y hacer commits descriptivos:
   ```bash
   git add .
   git commit -m "feat: descripción clara del cambio"
   ```

4. Subir branch y crear Pull Request:
   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```
   Luego crear PR en GitHub hacia `develop`

5. Esperar review y aprobación

6. Merge del PR (preferiblemente squash and merge)


### **Anatomía de un Pull Request**

Todo PR debe incluir:

**Título:** Claro y descriptivo
```
feat: Implementar sistema de login con JWT
fix: Corregir error en carga de productos
docs: Actualizar README con instrucciones de instalación
```

**Descripción:**
- ¿Qué hace este PR?
- ¿Por qué es necesario?
- ¿Qué issue resuelve? (si aplica)

**Screenshots:** Si hay cambios visuales

**Checklist:**
- [ ] El código funciona correctamente
- [ ] No hay errores en consola
- [ ] El código sigue las convenciones del equipo
- [ ] Se actualizó la documentación si es necesario

### **Comunicación y Organización**

**Reuniones:**
- **Daily Standup** (15 minutos al inicio de cada sesión):
  - ¿Qué hice desde la última vez?
  - ¿Qué voy a hacer hoy?
  - ¿Tengo algún blocker/problema?

- **Review Semanal** (viernes, 30 minutos):
  - Demostración de avances
  - Retrospectiva: qué funcionó, qué mejorar
  - Planning de la siguiente semana


---

## **ROLES Y RESPONSABILIDADES**

### **Roles Rotativos Semanales**

**Tech Lead (1 persona, rotar cada semana):**
- Supervisar la integración general entre grupos
- Resolver conflictos técnicos
- Tomar decisiones de arquitectura importantes
- Coordinar las dailies

**Git Master por Grupo (4 personas, 1 por grupo):**
- Responsable de revisar PRs de su equipo
- Asegurar que se siguen las convenciones de Git
- Ayudar a resolver merge conflicts
- Hacer el merge final tras aprobaciones

**Todos los miembros:**
- Revisar al menos 2 PRs de otros compañeros por semana
- Documentar su código adecuadamente
- Comunicar proactivamente blockers
- Ayudar a compañeros cuando lo necesiten

---

## **PROPUESTA DE PROYECTO**

### **Sistema de Gestión (Opciones)**

**Opción A: Sistema de Gestión de Biblioteca**
- Gestión de libros, autores, categorías
- Sistema de préstamos
- Usuarios y roles (admin, bibliotecario, usuario)
- Historial de préstamos
- Búsqueda y filtros

**Opción B: Sistema de Gestión de Inventario**
- Productos, categorías, proveedores
- Control de stock
- Entradas y salidas
- Alertas de stock bajo
- Reportes básicos

**Opción C: Plataforma de Reservas**
- Sistema de reservas (restaurante, canchas, salas)
- Calendario de disponibilidad
- Gestión de usuarios
- Confirmación de reservas
- Historial

**Opción D: Blog/CMS Colaborativo**
- Publicación de artículos
- Categorías y etiquetas
- Comentarios
- Likes/Favoritos
- Panel de administración

---

## **CRITERIOS DE EVALUACIÓN**

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Funcionalidad** | 35% | Features implementadas y funcionando correctamente |
| **Calidad de Código** | 25% | Estructura, buenas prácticas, limpieza, comentarios |
| **Trabajo en Equipo** | 20% | Uso de Git, PRs, reviews, comunicación, colaboración |
| **Documentación** | 10% | README, comentarios en código, documentación de API |
| **Presentación** | 10% | Demo, explicación técnica, claridad en la exposición |

---

## **CHECKLIST INICIAL - DÍA 1**

### **Setup del Proyecto**

- [ ] Definir qué tipo de aplicación se va a desarrollar
- [ ] Crear repositorio en GitHub (1 persona con acceso de todos)
- [ ] Agregar a todos los colaboradores con permisos adecuados
- [ ] Configurar protección de branches (`main` y `develop`)
- [ ] Crear branch `develop`
- [ ] Crear estructura de carpetas:
  ```
  proyecto-final/
  ├── backend/
  ├── frontend/
  └── README.md
  ```
- [ ] Crear GitHub Project con columnas: Backlog, To Do, In Progress, In Review, Done
- [ ] Definir y asignar grupos
- [ ] Crear issues iniciales para cada grupo
- [ ] Configurar canal de comunicación
- [ ] Definir Tech Lead de la Semana 1
- [ ] Definir Git Masters de cada grupo

### **Template de README Inicial**

```markdown
# Nombre del Proyecto

Descripción breve del proyecto.

## Tecnologías
- Frontend: React
- Backend: Node.js + Express
- Base de Datos: MySQL

## Equipo
### Backend API
- Nombre 1
- Nombre 2
- Nombre 3

### Frontend Core
- Nombre 4
- Nombre 5
- Nombre 6

### Frontend Features
- Nombre 7
- Nombre 8
- Nombre 9

### DevOps & Documentación
- Nombre 10
- Nombre 11

## Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Variables de Entorno

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nombre_db
JWT_SECRET=tu_secreto_aqui
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```
```

---

## **RECURSOS ÚTILES**

### **Documentación**
- [React Docs](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Git Branching](https://learngitbranching.js.org/)

### **Deployment**
- [Vercel](https://vercel.com/) - Frontend
- [Railway](https://railway.app/) - Backend + DB
- [Render](https://render.com/) - Backend + DB
- [Netlify](https://www.netlify.com/) - Frontend

### **Herramientas**
- [Postman](https://www.postman.com/) - Testing de API
- [dbdiagram.io](https://dbdiagram.io/) - Diseño de base de datos
- [Figma](https://www.figma.com/) - Wireframes/Mockups

---

## **CONSEJOS FINALES**

1. **Comunicación constante:** Es mejor preguntar antes que avanzar en la dirección equivocada
2. **Commits frecuentes:** Mejor muchos commits pequeños que uno gigante
3. **Code review constructivo:** Aprender de los demás y enseñar también
4. **Documentar mientras desarrollan:** No dejarlo para el final
5. **Probar antes de hacer PR:** Asegurarse de que funciona antes de pedir review
6. **No tener miedo a los merge conflicts:** Son normales y se aprende resolviéndolos
7. **Pedir ayuda:** Al formador, a compañeros, o buscar en documentación
8. **Disfrutar el proceso:** Es una oportunidad de aprender trabajando en equipo

---
