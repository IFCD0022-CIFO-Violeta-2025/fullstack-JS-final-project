# fullstack-JS-final-project
Proyecto Final alumnos curso Fullstack JS MySQL 2025

# Instalación

git clone https://github.com/IFCD0022-CIFO-Violeta-2025/fullstack-JS-final-project.git
cd ...\fullstack-JS-final-project
npm i

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