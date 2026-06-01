const express = require("express");

const { 
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} = require("../controllers/contactController");

const router = express.Router();

const validateContact = require("../middlewares/validateContact");

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Cria um novo contato
 *     responses:
 *       200:
 *         description: Contato criado com sucesso
 */

router.post(
  "/contacts",
  validateContact,
  createContact
);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Lista todos os contatos
 *     responses:
 *       200:
 *         description: Lista de contatos retornada com sucesso
 */

router.get("/contacts", getContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Busca um contato pelo ID
 *     responses:
 *       200:
 *         description: Contato encontrado com sucesso
 */

router.get("/contacts/:id", getContactById);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Atualiza um contato pelo ID
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 */

router.put(
  "/contacts/:id",
  validateContact,
  updateContact
);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove um contato pelo ID
 *     responses:
 *       200:
 *         description: Contato removido com sucesso
 */

router.delete("/contacts/:id", deleteContact);


module.exports = router;

