# 🚀 API NestJS + Prisma - Documentación Técnica

## 📋 Tabla de Contenidos

1. [Requisitos](#-requisitos)
2. [Configuración](#-configuración)
3. [Estructura](#-estructura-del-proyecto)
4. [Variables](#-variables-de-entorno)
5. [Endpoints](#-endpoints)
6. [Modelos](#-modelos-de-datos)
7. [Validaciones](#-validaciones)
8. [Errores](#-manejo-de-errores)
9. [Ejecución](#-ejecución)
10. [Pruebas](#-pruebas)
11. [Migraciones](#-migraciones)
12. [Seguridad](#-seguridad)
13. [Roadmap](#-roadmap)

---

## 🖥️ Requisitos

| Tecnología | Versión Mínima | Recomendada |
| ---------- | -------------- | ----------- |
| Node.js    | v16.x          | v20.x LTS   |
| npm        | 8.x            | 10.x        |
| MySQL      | 5.7            | 8.0         |
| NestJS CLI | 9.x            | 10.x        |

````bash
# Dependencias de desarrollo
npm install -D @nestjs/cli prisma typescript ts-node

## ⚙️ Configuración
Clonar repositorio:

```bash
git clone [repo-url] && cd nestjs-prisma-api

Instalar dependencias:

```bash
npm install

Configurar base de datos MySQL:

sql
CREATE DATABASE nestjs_prisma_test;
Crear archivo .env:

env
DATABASE_URL="mysql://user:pass@localhost:3306/database_test"
APP_PORT=3000

Ejecutar migraciones:

```bash
npx prisma migrate dev --name init

## 📁 Estructura del Proyecto
text
src/
├── app.module.ts
├── main.ts
├── prisma/
│   ├── schema.prisma
│   └── prisma.service.ts
├── users/
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
└── messages/
    ├── dto/
    ├── messages.controller.ts
    ├── messages.service.ts
    └── messages.module.ts

## 🔑 Variables de Entorno
Variable	Descripción	Ejemplo
DATABASE_URL	URL conexión MySQL	mysql://user:pass@localhost:3306/db
APP_PORT	Puerto aplicación	3000
APP_ENV	Entorno (dev/prod)	development

## 🌐 Endpoints
Usuarios (/users)
POST / - Crear usuario

json
{"name": "string", "email": "email@valido.com"}
GET /:id/messages - Obtener mensajes de usuario

Mensajes (/messages)
POST / - Crear mensaje

json
{"content": "string", "userId": number}

## 🗃️ Modelos de Datos
prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  messages  Message[]
  createdAt DateTime @default(now())
}

model Message {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}

## ✅ Validaciones
Usuario:
Nombre: string no vacío (1-100 chars)

Email: formato válido y único

Mensaje:
Contenido: string no vacío (1-500 chars)

userId: número entero positivo (usuario existente)

## 🚨 Manejo de Errores
Código	Situación	Ejemplo Respuesta
400	Validación fallida	{"message": "Validation failed"}
404	Recurso no encontrado	{"message": "User not found"}
500	Error interno del servidor	{"message": "Internal error"}

## 🚀 Ejecución
Desarrollo:

```bash
npm run start:dev
Producción:

```bash
npm run build && npm run start:prod

## 🧪 Pruebas
```bash
npm test       # Unit tests
npm run test:e2e  # End-to-end tests

## 🛠️ Migraciones
Crear nueva migración:

```bash
npx prisma migrate dev --name "descripcion"
Aplicar en producción:

```bash
npx prisma migrate deploy

## 🔒 Seguridad
Validación de todos los inputs

Sanitización básica de datos

Próximas mejoras:

Autenticación JWT

Rate limiting

CORS estrictos

## 🗺️ Roadmap
Prioridades:
Implementar autenticación

Añadir documentación Swagger

Dockerizar aplicación

Sistema de logging
````
