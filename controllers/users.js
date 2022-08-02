const bcrypt = require('bcrypt');

const userRouter = require('express').Router();
const User = require('../models/user');

//request permite traer la informacion de el usuario que hace una peticion
//respose permite respoder una peticion
userRouter.get('/:id', async (request, response) => {
  const usuario = await User.findById(request.params.id);

  response.json(usuario);
});

//await es codigo asincrono espere a que cargue y guardelo
userRouter.post('/', async (request, response) => {
  //body es el cuerpo de la request
  const bodyUser = request.body;
  if (!bodyUser.name || !bodyUser.username || !bodyUser.password) {
    response.status(400).json({
      error: 'Nombre de usuario o Contraseña no se encuentran ',
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(bodyUser.password, saltRounds);

  const user = new User({
    username: bodyUser.username,
    name: bodyUser.name,
    passwordHash,
  });

  const savedUse = await user.save();
  response.status(201).json(savedUse);
});

userRouter.put('/', (request, respose) => {});

userRouter.delete('/', (request, response) => {});

module.exports = userRouter;
