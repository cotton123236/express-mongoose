const User = require('./../models/usersModel')
const handlers = require('./../utils/handlers')
const status = require('../utils/status')


const { success, error } = handlers

// get all
const getAll = async (req, res, next) => {
  try {
    const data = await User.find()
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}

// get by id
const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await User.findById(id)
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}


module.exports = {
  getAll,
  getById
}