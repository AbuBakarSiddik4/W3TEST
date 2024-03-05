
function successMessage(res, code = 200, message = "Success", payload = {}) {
  return res.status(code).json({
    status: code,
    message: message,
    payload: payload,
  });
}

export default successMessage;
