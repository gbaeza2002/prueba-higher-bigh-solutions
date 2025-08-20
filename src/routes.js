import { Router } from "express";
import { authInsecure, authSigned } from "./security.js";
import { ORDERS, productSummaryQuadratic, productSummaryLinear } from "./orders.js";

const r = Router();

// Desafío A: seguridad
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints de autenticación
 */

/**
 * @swagger
 * /api/me/insecure:
 *   get:
 *     tags: [Authentication]
 *     summary: Endpoint de prueba con autenticación básica
 *     description: Versión insegura para comparación (solo verifica x-user-id)
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ID del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       401:
 *         description: Falta el header x-user-id
 */

r.get("/me/insecure", authInsecure, (req, res) => res.json({ id: req.user.id }));

/**
 * @swagger
 * /api/me/secure:
 *   get:
 *     tags: [Authentication]
 *     summary: Endpoint seguro con autenticación HMAC
 *     description: |
 *       Requiere:
 *       - x-user-id
 *       - x-timestamp (UNIX ms)
 *       - x-signature (HMAC_SHA256(userId + timestamp, SECRET))
 *     parameters:
 *       - in: header
 *         name: x-user-id
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: x-timestamp
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: x-signature
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ID del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       401:
 *         description: Firma inválida o headers faltantes
 *       500:
 *         description: Error del servidor (SECRET no configurado)
 */
r.get("/me/secure", authSigned, (req, res) => res.json({ id: req.user.id }));


// Desafío B: paginación 
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de órdenes (NO IMPLEMENTADO)
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: Obtiene órdenes paginadas
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 5
 *     responses:
 *       200:
 *         description: Lista paginada de órdenes
 *         headers:
 *           X-Total-Count:
 *             description: Número total de órdenes
 *             schema:
 *               type: integer
 *       400:
 *         description: Parámetros inválidos
 *       501:
 *         description: No implementado (prueba técnica)
 */
r.get("/orders", (req, res) => {
    return res.status(501).json({ error: "not implemented" });
});



// Desafío C: performance
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Resúmenes de productos
 */

/**
 * @swagger
 * /api/products/summary/slow:
 *   get:
 *     tags: [Products]
 *     summary: Resumen de productos (versión lenta O(n^2))
 *     description: Versión de referencia con complejidad cuadrática
 *     responses:
 *       200:
 *         description: Resumen de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sku:
 *                     type: string
 *                   qty:
 *                     type: integer
 *                   amount:
 *                     type: number
 */
r.get("/products/summary/slow", (_req, res) => res.json(productSummaryQuadratic()));
/**
 * @swagger
 * /api/products/summary/fast:
 *   get:
 *     tags: [Products]
 *     summary: Resumen de productos (versión optimizada O(n))
 *     description: Versión optimizada con complejidad lineal
 *     responses:
 *       200:
 *         description: Resumen de productos ordenado por amount descendente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sku:
 *                     type: string
 *                   qty:
 *                     type: integer
 *                   amount:
 *                     type: number
 */
r.get("/products/summary/fast", (_req, res) => res.json(productSummaryLinear()));

export default r;
