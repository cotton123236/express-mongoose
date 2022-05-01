const status = {
  success: {
    code: 200,
    message: 'success'
  },

  error: {
    code: 400,
    message: 'cannot find data or format error.'
  },

  errorId: {
    code: 400,
    message: 'cannot find data by id.'
  },

  errorField: {
    code: 400,
    message: 'some field is required.'
  }
}


module.exports = status