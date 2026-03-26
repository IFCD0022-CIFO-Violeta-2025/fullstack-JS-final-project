/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - starttime
 *         - endtime
 *       properties:
 *         idEvent:
 *           type: integer
 *           description: ID evento
 *         title:
 *           type: string
 *           description: Nombre evento
 *         description:
 *           type: string
 *           description: Descripción evento
 *         starttime:
 *           type: string
 *           format: date-time
 *           description: Hora de inicio
 *         endtime:
 *           type: string
 *           format: date-time
 *           description: Hora final
 *         capacity:
 *           type: integer
 *           description: Número máximo de participantes
 *       example:
 *         idEvent: 1
 *         title: "React Conference"
 *         description: "Reunión en línea para desarrolladores"
 *         starttime: "2025-11-20T10:00:00Z"
 *         endtime: "2025-11-20T18:00:00Z"
 *         capacity: 200
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         idUser:
 *           type: integer
 *           description: ID User
 *         username:
 *           type: string
 *           description: Login de Usuario
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail
 *         password:
 *           type: string
 *           description: Hash-password
 *         name:
 *           type: string
 *           description: Name
 *         lastName:
 *           type: string
 *           description: Surname
 *         aboutMe:
 *           type: string
 *           description: User info
 *         address:
 *           type: string
 *           description: Address
 *         banned:
 *           type: boolean
 *           description: Is the user blocked?
 *       example:
 *         idUser: 1
 *         username: "it_dev"
 *         email: "it@example.com"
 *         password: "hashedpassword123"
 *         name: "Juan"
 *         lastName: "Moreno"
 *         aboutMe: "Fullstack developer"
 *         address: "Barcelona, Spain"
 *         banned: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "newuser"
 *         email:
 *           type: string
 *           format: email
 *           example: "newuser@example.com"
 *         password:
 *           type: string
 *           example: "mypassword123"
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "newuser@example.com"
 *         password:
 *           type: string
 *           example: "mypassword123"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authorization
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserHistory:
 *       type: object
 *       properties:
 *         idHistory:
 *           type: integer
 *         userId:
 *           type: integer
 *         action:
 *           type: string
 *         performedBy:
 *           type: integer
 *         snapshot:
 *           type: object
 *         timestamp:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /events/nearby:
 *   get:
 *     summary: Find nearby events by radius
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         description: Latitude
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *         description: Longitude
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           default: 10
 *         description: Radius in km (1–20)
 *     responses:
 *       200:
 *         description: Events within radius
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEvent: { type: integer }
 *                   title: { type: string }
 *                   latitude: { type: number }
 *                   longitude: { type: number }
 *                   distance: { type: number }
 *             examples:
 *               sample:
 *                 value:
 *                   - idEvent: 1
 *                     title: "React Meetup"
 *                     latitude: 41.387
 *                     longitude: 2.170
 *                     distance: 0.5
 *       400:
 *         description: Incorrect parameters
 */

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API",
      version: "1.0.0",
      description:
        "Documentación de la API para el sistema de eventos, usuarios, publicaciones y mensajes",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local dev server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // 👇 ВАЖЛИВО: apis має бути тут, а не всередині definition
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi;
