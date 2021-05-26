const ContactController = require('../controllers/contact.controle');

module.exports = [
  {
    method: 'GET',
    path: '/contacts',
    handler: ContactController.list,
  },

  {
    method: 'POST',
    path: '/contacts',
    handler: ContactController.register
  }
];
