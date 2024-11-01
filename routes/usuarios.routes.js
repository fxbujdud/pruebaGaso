const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usuarios.controller");

/* GET users listing. */

/**
 * @swagger
 * components:
 *    schemas:
 *      usuario:
 *        type: object
 *        required:
 *          -id
 *          -nombre
 *          -paterno
 *          -materno
 *          -username
 *          -roll
 *        properties:
 *          id:
 *            type: string
 *            description: ID de usuario generado por Mongo.
 *          nombre:
 *            type: string
 *            description: El nombre o nombres del usuario.
 *          paterno:
 *            type: string
 *            description: Apellido paterno del usuario.
 *          materno:
 *            type: string
 *            description: Apellido materno del usuario.
 *          username:
 *            type: string
 *            description: Cuenta de usuario.
 *          roll:
 *            type: integer
 *            description: Nivel de uso al que puede acceder.
 *        example:
 *          id: 67225d8ec6b3d63e54b6c728
 *          nombre: Juan Pablo
 *          paterno: Perez
 *          materno: Perez
 *          username: usuario12
 *          roll: 1
 *      nuevoUsuario:
 *        type: object
 *        required:
 *          -nombre
 *          -paterno
 *          -materno
 *          -username
 *          -password
 *          -roll
 *        properties:
 *          nombre:
 *            type: string
 *            description: El nombre o nombres del usuario.
 *          paterno:
 *            type: string
 *            description: Apellido paterno del usuario.
 *          materno:
 *            type: string
 *            description: Apellido materno del usuario.
 *          password:
 *            type: string
 *            description: Contrasena del usuario, por defecto cifrada.
 *          username:
 *            type: string
 *            description: Cuenta de usuario.
 *          roll:
 *            type: integer
 *            description: Nivel de uso al que puede acceder.
 *        example:
 *          nombre: Juan Pablo
 *          paterno: Perez
 *          materno: Perez
 *          username: usuario12
 *          password: 123asdZXC
 *          roll: 1
 */

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Endpoint para retorno de usuarios
 *
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista los usuarios del sistema.
 *     tags: [Usuarios]
 *     description: Retorna una lista de los usuarios del sistema
 *     responses:
 *       201:
 *         description: Usuarios del sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Lista de los usuarios del sistema
 *                   type: array
 *                   items:
 *                     $ref: '#components/schemas/usuario'
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 201
 *       500:
 *         description: Usuarios del sistema.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripcion de error ocurrido.
 *                   example: El servidor no puede procesar la solicitud, intente mas tarde
 *                 status:
 *                   type: integer
 *                   description: Código de respuesta HTTP.
 *                   example: 500
 */
router.get("/", async function (req, res, next) {
  const users = await usercontroller.findUser();
  if (users !== null) {
    res.status(201).send({ data: users, status: 201 });
  } else {
    res
      .status(500)
      .send({ data: "No se encontro ningun usuario", status: 500 });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca un usuario en especifico del sistema.
 *     tags: [Usuarios]
 *     description: Retorna un usuario del sistema en especifico en caso de encontrarlo segun su id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de usuario.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Usuario seleccionado segun su id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Usuario cuyo id fue encontrado
 *                   schema:
 *                    type: object
 *                    items:
 *                      $ref: '#components/schemas/usuario'
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 201
 *       404:
 *         summary: Usuarios del sistema no encontrado.
 *         description: Retorna un mensaje de error si el id proporcionado no corresponde a ningun usuario en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripcion de error ocurrido.
 *                   example: El usuario solicitado no existe o fue dado de baja
 *                 status:
 *                   type: integer
 *                   description: Código de respuesta HTTP.
 *                   example: 404
 *
 */
router.get("/:id", async function (req, res, next) {
  const user = await usercontroller.findUserById(req.header.id);

  if (user !== null) {
    res.status(201).send({ data: user, status: 201 });
  } else {
    res
      .status(404)
      .send({
        data: "El usuario solicitado no existe o fue dado de baja",
        status: 404,
      });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un usuario nuevo del sistema.
 *     tags: [Usuarios]
 *     description: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/nuevoUsuario'
 *     responses:
 *       201:
 *         description: Mensaje de respuesta por el usuario creado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Usuario cuyo id fue encontrado
 *                   type: string
 *                   example: El usuario fue creado
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 201
 *       400:
 *         description: Mensaje de respuesta por campos de nombre y/o correo faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: No se encontro campos nombre, paterno, materno, correo.
 *                   type: string
 *                   example: No se pudo procesar, todos los campos son obligatorios
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 400
 *       412:
 *         description: Mensaje de respuesta por duplicacion de correo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Mensaje de errpr
 *                   type: string
 *                   example: El campo email contiene un error, solo se puede registrar el correo una unica vez.
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 412
 */
router.post("/", async function (req, res, next) {

  if (!isNameExist(req.body.nombre, req.body.paterno, req.body.materno) || req.body.email.length < 0) {
    res.status(400).send({
      data: "No se pudo procesar, todos los campos son obligatorios",
      status: 400,
    });
  }

  const exist = await usercontroller.findByEmail(req.body.email);

  if (exist.length > 0) {
    res.status(412).send({
      data: "El campo email contiene un error, solo se puede registrar el correo una unica vez.",
      status: 412,
    });
  }

    const user = await usercontroller.createUser(req.body);
    if (user !== null) {
      res.status(201).send({ data: "El usuario fue creado", status: 201 });
    } else {
      res.status(500).send({
        data: "Surgio un problema en el servidor, intente mas tarde.",
        status: 500,
      });
    }
  
});

/**
 * @swagger
 * /users:
 *   put:
 *     tags: [Usuarios]
 *     summary: Modifica un usuario en del sistema.
 *     description: Modifica un usuario existente en el sistema segun su id 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/usuario'
 *     responses:
 *       201:
 *         description: Mensaje de respuesta por el usuario modificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Usuario que fue modificado
 *                   type: string
 *                   example: Modificado
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 201
 *       400:
 *         description: Mensaje de respuesta por campos de nombre y/o correo faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: No se encontro campos nombre, paterno, materno, correo.
 *                   type: string
 *                   example: No se pudo procesar, todos los campos son obligatorios
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 400
 *       500:
 *         description: Mensaje de respuesta por error al crear el usuario en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: No se pudo generar el usuario por problemas en el servidor.
 *                   type: string
 *                   example: Se presento un error al modificar el usuario.
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 500
 */
router.put("/", async function (req, res, next) {
  const user = await usercontroller.updateUser(req.body.id, req.body);

  if (!isNameExist(req.body.nombre, req.body.paterno, req.body.materno) || req.body.email.length < 0) {
    res.status(400).send({
      data: "No se pudo procesar, todos los campos son obligatorios",
      status: 400,
    });
  }

  if (user !== null) {
    res.status(201).send({ data: "Modificado", status: 201 });
  } else {
    res.status(500).send({
      data: "Se presento un error al modificar el usuario.",
      status: 500,
    });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Elimita un usuario del sistema.
 *     description: Elimina un usuario segun su id otorgado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de usuario.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Mensaje de respuesta por el usuario eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Usuario que fue eliminado
 *                   type: string
 *                   example: Eliminado
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 201
 *       404:
 *         description: Mensaje de respuesta por un usuario inexistente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: No se encontro el usuario a eliminar.
 *                   type: string
 *                   example: El usuario no existe.
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 404
 *       502:
 *         description: Mensaje de respuesta por error inesperado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                message:
 *                   description: Se presento un problema inesperado en el servidor que no permite realizar el proceso.
 *                   type: string
 *                   example: Se presento un error al eliminar.
 *                status:
 *                  description: Código de respuesta HTTP
 *                  type: integer
 *                  example: 502
 */
router.delete("/", async function (req, res, next) {
  const user = await usercontroller.findUserById(req.body.id);

  if (user !== null) {
    const deleteUser = await usercontroller.deleteUser(req.body.id);

    if (deleteUser !== null) {
      res.status(201).send({ data: "El usuario fue eliminado", status: 201 });
    } else {
      res
        .status(502)
        .send({ data: "Se ha presentado un error inesperado", status: 502 });
    }
  } else {
    res.status(404).send({
      data: "El usuario no existe",
      status: 404,
    });
  }
});

function isNameExist(name, lastname, slastname) {
  let flag = true;

  flag = name !== void 0 && name !== null && name.length > 0;
  flag = lastname !== void 0 && lastname !== null && lastname.length > 0;
  flag = slastname !== void 0 && slastname !== null && slastname.length > 0;

  return flag;
}

module.exports = router;
