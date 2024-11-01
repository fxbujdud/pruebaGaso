const usuarioModel = require('../models/usuario.model');

const findAll = async () => {

  let response = null;

  try {
    response = await usuarioModel.find();
  } catch (error) {
    response = null;
  } finally {
    return response;
  }

}

const findByEmail = async (email) => {
  let response = null;
  try {
    response = await usuarioModel.find( {email} );
  } catch (error) {
    response = null;
  } finally {
    return response !== null ? response : {};
  }
} 

const findById = async (id) => {
  let response = null;

  try {
    response = await usuarioModel.findById( { _id: id } );
  } catch (error) {
    response = null;
  } finally {
    return response;
  }
} 

const createUser = async (user) => {
  let response = null;

  try {
    response = await usuarioModel.create( user );
  } catch (error) {
    response = null;
  } finally {
    return response;
  }
} 

const updateUsuario = async (id, usuario) => {
  try {
    response = await usuarioModel.findByIdAndUpdate(id, usuario, { useFindAndModify: false  } );
  } catch (error) {
    response = null;
  } finally {
    return response;
  }
}

const deleteUsuario = async (id) => {
  try {
    response = await usuarioModel.findByIdAndDelete(id);
  } catch (error) {
    response = null;
  } finally {
    return response;
  }
}

module.exports = {
  findUser: findAll,
  findByEmail: findByEmail,
  findUserById: findById,
  updateUser: updateUsuario,
  deleteUser:deleteUsuario,
  createUser: createUser
}