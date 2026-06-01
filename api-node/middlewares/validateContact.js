
function validateContact(req, res, next) {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      success: false,
      message: "Nome e número são obrigatórios",
    });
  }

  next();
}

module.exports = validateContact;

