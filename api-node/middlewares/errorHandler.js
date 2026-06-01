
function errorHandler(err, req, res, next) {
  console.log("Erro global:", err);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
}

module.exports = errorHandler;
