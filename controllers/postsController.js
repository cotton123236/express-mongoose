const Post = require('./../models/postsModel')
const handlers = require('./../utils/handlers')
const status = require('../utils/status')


const { success, error } = handlers

// get all
const getAll = async (req, res, next) => {
  try {
    const { query } = req
    const data = await Post.find(query)
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}

// get one by id
const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await Post.findById(id)
    success(res, [data])
  }
  catch(err) {
    error(res, status.errorId, err)
  }
}

// post one or many
const postOneOrMany = async (req, res, next) => {
  try {
    const { body } = req
    const isArray = Array.isArray(body)
    const getContent = (item) => {
      const { name, content } = item
      if (!name || !content) {
        error(res, status.errorField)
      }
      return { name, content }
    }
    // create data
    let data
    // post many
    if (isArray) {
      const items = []
      body.forEach(item => items.push(getContent(item)))
      data = await Post.insertMany(items)
    }
    // post one
    else {
      data = [await Post.create(getContent(body))]
    }
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}

// delete all
const deleteAll = async (req, res, next) => {
  await Post.deleteMany({})
  const data = await Post.find()
  success(res, data)
}

// delete by id
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = [await Post.findByIdAndDelete(id)]
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}

// patch by id
const patchById = async (req, res, next) => {
  try {
    const { body } = req
    const { id } = req.params
    const { name, content } = body
    const patches = {}
    if (!name && !content) {
      error(res, status.errorField)
    }
    if (name) patches.name = name
    if (content) patches.content = content
    await Post.findByIdAndUpdate(id, patches)
    const data = await Post.findById(id)
    success(res, data)
  }
  catch(err) {
    error(res, status.error, err)
  }
}


module.exports = {
  getAll,
  getById,
  postOneOrMany,
  deleteAll,
  deleteById,
  patchById
}