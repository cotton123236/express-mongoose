const status = require('./../utils/status')

const success = (res, data) => {
  res.send({
    status: 'success',
    data
  })
}

const error = (res, status, error = null) => {
  const { code, message } = status
  res.status(code).json({
    status: 'fail',
    message,
    error
  })
}


module.exports = {
  success,
  error
}