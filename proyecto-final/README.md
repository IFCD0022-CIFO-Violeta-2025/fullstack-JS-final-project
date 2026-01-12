# fullstack-JS-final-project
Proyecto Final alumnos curso Fullstack JS MySQL 2025

# Instalación

git clone https://github.com/IFCD0022-CIFO-Violeta-2025/fullstack-JS-final-project.git
cd ...\fullstack-JS-final-project
npm i

# Informacion de mySQL servidor (PC de Armand)
hostname: 10.199.25.100
port: 3306
username: admin
password: admin



# Normas para Mensajes de Commit

Para mantener un historial claro y consistente, seguimos el estándar **Conventional Commits**.

---

## 1. Recomendaciones Generales
- El mensaje debe ser **corto e informativo** (máx. 50 caracteres en el título).  
- Usa **estilo imperativo**: “Arreglar bug” en lugar de “Bug arreglado”.  
- Separa el título y la descripción con una línea en blanco si necesitas agregar más detalles.  
- No incluyas números de tickets a menos que la política del equipo lo requiera.

---

## 2. Estructura del Commit

### Tipos de Commits
| Tipo      | Descripción |
|-----------|-------------|
| feat      | Nueva funcionalidad |
| fix       | Corrección de error |
| docs      | Cambios en documentación |
| style     | Formato, espacios, puntos y comas (sin cambiar lógica) |
| refactor  | Refactorización sin cambiar funcionalidad |
| perf      | Cambios para mejorar rendimiento |
| test      | Añadir o corregir tests |
| chore     | Tareas auxiliares (build, configs, npm, husky) |
| ci        | Cambios en scripts de CI/CD |

### Ejemplos

feat(frontend): añadir página de perfil
fix(backend): corregir error al crear usuario
docs: actualizar README con instrucciones de instalación
style: formatear archivos con prettier
refactor: mover funciones a módulo utils
test: añadir tests para lógica de autenticación
chore: actualizar dependencias npm
ci: añadir workflow para GitHub Actions

---

## 3. Consejos
- Título: < 50 caracteres, primera letra en minúscula (según Conventional Commits).  
- Descripción (body): hasta 72 caracteres por línea.  
- Un commit = una unidad de cambio. No mezclar bugs y features en un mismo commit.  
- Usa el prefijo de **área/directorio** (`frontend`, `backend`) para contextualizar los cambios.

Mantener estas normas ayuda a que todo el equipo entienda rápidamente los cambios y facilita automatizar releases si se usa versionado semántico.

# Normas para Creación de Branches

Para mantener un flujo de trabajo ordenado y predecible, seguimos estas reglas al crear ramas:

---

## 1. Estructura de nombres
Usa un formato consistente para que sea fácil identificar el propósito de la rama:

### Tipos comunes
main 
├── develop
    ├── feature/backend-auth
    ├── feature/backend-users-crud
    ├── feature/backend-products
    ├── feature/frontend-login
    ├── feature/frontend-dashboard
    ├── feature/frontend-product-list
    ├── fix/bug-nombre-descriptivo
    └── ...



## 2. Reglas generales
- NUNCA hacer commit directo a main o develop
- Cada nueva funcionalidad o fix = 1 branch nueva desde develop
- Nomenclatura obligatoria:
- Features: feature/nombre-descriptivo
- Fixes: fix/descripcion-del-bug
- Docs: docs/que-se-documenta
- Pull Request (PR) obligatorio para merge a develop
- Mínimo 1 review aprobado de otro compañero antes de hacer merge
- Al final de cada semana: merge de develop a main (supervisión)

---

## 3. Buenas prácticas
- Haz pull antes de crear tu rama para evitar conflictos.  
- Borra ramas locales y remotas que ya se hayan mergeado.  
- Usa ramas temporales solo para pruebas locales; nunca hagas push de ramas experimentales directamente al repositorio principal.
