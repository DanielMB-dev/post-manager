# Posts Manager

**Posts Manager** es una aplicación web completa para la gestión de posts que permite crear, leer, actualizar y eliminar publicaciones. La aplicación está dividida en dos partes: un backend API REST construido con Express.js y una interfaz frontend desarrollada con React + Redux Toolkit.

## Funcionalidades

- ✅ **CRUD completo de posts**: Crear, leer, actualizar y eliminar publicaciones
- ✅ **API REST**: Backend con endpoints bien estructurados 
- ✅ **Base de datos PostgreSQL**: Almacenamiento persistente con Prisma ORM
- ✅ **Frontend React**: Interfaz de usuario moderna y reactiva
- ✅ **Estado global**: Gestión de estado con Redux Toolkit
- ✅ **TypeScript**: Tipado estático en el frontend
- ✅ **Docker**: Base de datos containerizada para desarrollo
## Stack Tecnológico

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Prisma ORM** - Object-Relational Mapping para base de datos
- **PostgreSQL** - Sistema de gestión de base de datos relacional
- **Docker** - Containerización de la base de datos
- **Nodemon** - Reinicio automático del servidor en desarrollo

### Frontend
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Redux Toolkit** - Gestión de estado global
- **React Redux** - Bindings de React para Redux
- **Vite** - Build tool y servidor de desarrollo
- **ESLint** - Linter para calidad de código
- **SWC** - Compilador rápido para TypeScript/JavaScript
## Prerrequisitos

- Node.js (v18+)
- Docker corriendo en tu maquina y Docker Compose
- npm

## Configuración del Proyecto

### Navegación entre carpetas

Para moverte entre las diferentes partes del proyecto, usa estos comandos en la terminal:

**Ir al backend:**
```cmd
cd backend
```

**Volver al directorio raíz:**
```cmd
cd ..
```

**Ir al frontend:**
```cmd
cd posts-manager-frontend
```

### 1. Configuración del Backend

**Navegar al directorio del backend:**
```cmd
cd backend
```

#### 1.1. Levantar la Base de Datos con Docker

Primero, inicia el contenedor de PostgreSQL:

```bash
docker-compose up -d
```

Esto levantará una instancia de PostgreSQL en el puerto `5433`.

#### 1.2. Instalar Dependencias del Backend

```cmd
npm install
```

#### 1.3. Configurar Variables de Entorno

El archivo `.env` ya está configurado con:

```env
DATABASE_URL='postgresql://postgres:postgres@localhost:5433/postgres?schema=public'
```

#### 1.4. Configurar Migraciones con Prisma

Ejecuta las migraciones para crear las tablas en la base de datos:

```bash
npx prisma migrate deploy
```

O si necesitas generar el cliente de Prisma:

```bash
npx prisma generate
```

Para crear una nueva migración (si modificas el schema):

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

#### 1.5. Poblar la Base de Datos (Opcional)

Para llenar la base de datos con datos de prueba:

```bash
npm run seed
```

Este comando creará 8 posts de ejemplo con contenido sobre desarrollo web.

#### 1.6. Levantar el Servidor Backend

```cmd
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 2. Configuración del Frontend

**Navegar al directorio del frontend:**
```cmd
cd ..
cd posts-manager-frontend
```

#### 2.1. Instalar Dependencias del Frontend

```cmd
npm install
```

#### 2.2. Levantar el Servidor Frontend

```cmd
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## API Endpoints

La API proporciona los siguientes endpoints CRUD para posts:

- `GET /posts` - Obtener todos los posts
- `GET /posts/:id` - Obtener un post específico por ID
- `POST /posts` - Crear un nuevo post, retorna el post creado
- `PUT /posts/:id` - Actualizar un post existente, retorna el post editado
- `DELETE /posts/:id` - Eliminar un post, retorna el post eliminado


### Ejemplo de Uso

**Crear un post:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"name": "Mi Post", "description": "Descripción del post"}'
```

**Ejemplo de respuestas de la api**

```bash
{
    "success": true,
    "data": {
        "id": "23ee4367-a6df-4644-aa44-3ab6f045b5ca",
        "name": "post2",
        "description": "description2",
        "createdAt": "2025-07-24T16:13:31.788Z",
        "updatedAt": "2025-07-24T16:18:50.598Z"
    }
}
```
**Obtener todos los posts:**
```bash
curl http://localhost:3000/posts
```
**Ejemplo de respuestas de la api**

```bash
{
    "success": true,
    "data": [
        {
            "id": "d4623479-7513-4895-af85-3c4834d1b04e",
            "name": "Getting Started with React",
            "description": "A comprehensive guide to building your first React application with modern hooks and best practices.",
            "createdAt": "2025-07-24T16:13:31.788Z",
            "updatedAt": "2025-07-24T16:13:31.788Z"
        },
        {
            "id": "ebb793d5-3df7-40f9-a40c-250d152aa4e7",
            "name": "Node.js Performance Tips",
            "description": "Learn how to optimize your Node.js applications for better performance and scalability.",
            "createdAt": "2025-07-24T16:13:31.788Z",
            "updatedAt": "2025-07-24T16:13:31.788Z"
        },
    ]
}
```

## Scripts Disponibles Backend

- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run seed` - Puebla la base de datos con datos de prueba
- `npm test` - Ejecuta las pruebas (no implementado aún)


## Solución de Problemas

**Error de conexión a la base de datos:**
1. Verifica que Docker esté corriendo
2. Asegúrate de que el contenedor de PostgreSQL esté activo: `docker-compose ps`
3. Verifica la variable `DATABASE_URL` en `.env`

**Error de permisos con Prisma:**
1. Intenta regenerar el cliente: `npx prisma generate`
2. Si persiste, elimina la carpeta `generated/` y vuelve a generar

**El puerto 3000 ya está en uso:**
- Cambia el puerto en `app.js` o termina el proceso que usa el puerto 3000

