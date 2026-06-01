const { publishContact } = require("../services/contactService");

const Contact = require("../models/Contact");

async function createContact(req, res) {
  const { name, number } = req.body;

  const existingContact = await Contact.findOne({
    number
  });

  if (existingContact) {
    return res.status(400).json({
      success: false,
      message: "Já existe um contato com esse número"
    });
  }
  
  const contact = {
    name,
    number,
  };

  await publishContact(contact);

  res.json({
    success: true,
    message: "Contato publicado no Redis",
  });
}

async function getContacts(req, res) {

  const contacts = await Contact.find();

  res.json(contacts);

}

async function getContactById(req, res) {

  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {

    return res.status(404).json({
      success: false,
      message: "Contato não encontrado"
    });

  }

  res.json(contact);

}

async function updateContact(req, res) {

  const { id } = req.params;

  const { name, number } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      number
    },
    {
      new: true
    }
  );

  if (!updatedContact) {

    return res.status(404).json({
      success: false,
      message: "Contato não encontrado"
    });

  }

  res.json({
    success: true,
    contact: updatedContact
  });

}

async function deleteContact(req, res) {

  const { id } = req.params;

  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {

    return res.status(404).json({
      success: false,
      message: "Contato não encontrado"
    });

  }

  res.json({
    success: true,
    message: "Contato deletado com sucesso"
  });

}


module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
};

