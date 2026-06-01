const redisClient = require("../config/redis");

const Contact = require("../models/Contact");


async function publishContact(contact) {
  
  await Contact.create(contact);
  await redisClient.publish(
    "contacts",
    JSON.stringify(contact)
  );

  console.log("Contato enviado para o Redis:", contact);

  
}

module.exports = {
  publishContact
};
