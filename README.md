# Sistema de Autenticación con Nuxt 3, Prisma y Tailwind CSS

Este proyecto es un sistema de autenticación completo desarrollado con Nuxt 3, utilizando Prisma como ORM para la base de datos y Tailwind CSS para los estilos. Incluye funcionalidades de registro, inicio de sesión, y soporte para autenticación con Google OAuth.

## Características

- **Autenticación de Usuarios:** Registro y inicio de sesión con credenciales (correo electrónico y contraseña).
- **Google OAuth:** Integración para inicio de sesión a través de cuentas de Google.
- **Gestión de Sesiones:** Manejo de sesiones de usuario persistentes.
- **Base de Datos:** Utiliza MySQL con Prisma ORM para la gestión de datos.
- **Roles de Usuario:** Soporte para diferentes roles de usuario (SUBSCRIBER, PUBLISHER, ADMINISTRATOR).
- **API RESTful:** Endpoints de backend para la lógica de autenticación.
- **Estilos Modernos:** Desarrollado con Tailwind CSS para una interfaz de usuario limpia y responsiva.
- **Gestión de Estado:** Pinia para una gestión de estado eficiente en el frontend.
- **Seguridad:** Implementación de hashing de contraseñas (bcrypt) y limitación de tasa de solicitudes (rate limiting).
- **Envío de Correos:** Funcionalidad para el envío de correos electrónicos (por ejemplo, para recuperación de contraseña).

## Tecnologías Utilizadas

- **Frontend:**
  - [Nuxt 3](https://nuxt.com/)
  - [Vue 3](https://vuejs.org/)
  - [Pinia](https://pinia.vuejs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Backend:**
  - [Nuxt 3 Server Routes](https://nuxt.com/docs/guide/directory-structure/server)
  - [@sidebase/nuxt-auth](https://sidebase.io/nuxt-auth) (basado en [NextAuth.js](https://next-auth.js.org/))
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  - [google-auth-library](https://www.npmjs.com/package/google-auth-library)
  - [nodemailer](https://nodemailer.com/about/)
- **Base de Datos:**
  - [Prisma ORM](https://www.prisma.io/)
  - [MySQL](https://www.mysql.com/)
- **Validación:**
  - [Joi](https://joi.dev/)
  - [Zod](https://zod.dev/)

## Configuración del Proyecto

Para configurar y ejecutar el proyecto localmente, sigue los siguientes pasos:

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd auth-system-nuxt3-started
```

### 2. Instalación de Dependencias

Instala las dependencias del proyecto usando npm:

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
# Base de datos
NUXT_DATABASE_URL="mysql://user:password@host:port/database"

# Secreto de autenticación (generar una cadena aleatoria larga y segura)
NUXT_AUTH_SECRET="YOUR_AUTH_SECRET_HERE"

# URL de origen para la autenticación (ej. http://localhost:3000)
NUXT_AUTH_ORIGIN="http://localhost:3000"

# URL base de la API (ej. http://localhost:3000/api)
NUXT_PUBLIC_API_BASE="http://localhost:3000/api"

# Credenciales de Google OAuth (si usas Google Login)
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

**Nota:** Para `NUXT_AUTH_SECRET`, puedes generar una cadena segura utilizando herramientas como `openssl rand -base64 32`.

### 4. Configuración de la Base de Datos con Prisma

Asegúrate de que tu servidor MySQL esté en funcionamiento y que la base de datos especificada en `NUXT_DATABASE_URL` exista.

Ejecuta las migraciones de Prisma para crear las tablas en tu base de datos:

```bash
npx prisma migrate dev --name init
```

Si ya tienes migraciones existentes, puedes aplicar la última:

```bash
npx prisma migrate deploy
```

### 5. Ejecutar el Proyecto

Una vez que las dependencias estén instaladas y las variables de entorno configuradas, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo con hot-reloading.
- `npm run build`: Compila la aplicación para producción.
- `npm run generate`: Genera la aplicación como archivos estáticos.
- `npm run preview`: Sirve la aplicación compilada en modo de producción.
- `npm run postinstall`: Prepara la aplicación Nuxt después de la instalación de dependencias.

## Estructura del Proyecto

- `assets/`: Archivos estáticos como CSS, imágenes, etc.
- `components/`: Componentes Vue reutilizables.
- `layouts/`: Layouts de la aplicación.
- `lib/`: Archivos de utilidad, como la instancia de Prisma.
- `pages/`: Rutas de la aplicación (páginas Vue).
- `prisma/`: Esquemas de Prisma y migraciones de la base de datos.
- `public/`: Archivos estáticos que se sirven directamente.
- `server/`: Lógica de backend (API routes, middleware, etc.).
- `store/`: Módulos de Pinia para la gestión de estado.

## Contribución

Si deseas contribuir a este proyecto, por favor, sigue los siguientes pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y asegúrate de que las pruebas pasen (si existen).
4.  Haz commit de tus cambios (`git commit -m 'feat: Añadir nueva funcionalidad'`).
5.  Sube tu rama (`git push origin feature/nueva-funcionalidad`).
6.  Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
