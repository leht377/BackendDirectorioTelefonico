const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const phoneRouter = require('express').Router();
const Phone = require('../models/phone');
const User = require('../models/user');

phoneRouter.get('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);
  const { id } = request.params;

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const phone = await Phone.findById(id);

  response.status(200).json(phone);
});

phoneRouter.get('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const phones = await Phone.find({ user: decodeToken.id });
  response.json(phones);
});

phoneRouter.post('/', async (request, response) => {
  const bodyphone = request.body;
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const user = await User.findById(decodeToken.id);
  const phone = new Phone({
    name: bodyphone.name,
    number: bodyphone.number,
    user: user._id,
  });
  const { _id } = await phone.save();
  const phoneSaved = await Phone.findById(_id).populate('user', {
    userName: 1,
    name: 1,
  });
  user.phones = user.phones.concat(phoneSaved._id);
  await user.save({ validateModifiedOnly: true });
  response.status(201).json(phoneSaved);
});

phoneRouter.put('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);
  const bodyPhone = request.body;
  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const phone = {
    name: bodyPhone.name,
    number: bodyPhone.number,
    user: decodeToken.id,
  };

  const { id } = await Phone.findByIdAndUpdate(request.params.id, phone, {
    new: true,
  });
  const phoneUpdated = await Phone.findById(id);
  response.json(phoneUpdated).status(200);
});

phoneRouter.delete('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodeToken.id) {
    return response.status(401).json({ error: 'Token perdido o Invalido' });
  }

  const phoneToremove = await Phone.findById(request.params.id);

  if (phoneToremove.user.toString() === decodeToken.id.toString()) {
    await Phone.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }
  response.status(401).json({
    error: 'No puede eleminar este telefono',
  });
});

module.exports = phoneRouter;
