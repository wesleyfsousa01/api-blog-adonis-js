import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async index({response}: HttpContextContract) {
    try {
      const users = await User.all()
      return response.status(200).json(users);
    }
    catch (err) {
      const message = 'Erro ao listar registros.'
      return response.status(500).json({err: message});
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const userData = request.all();
      const user = new User()
      user.fill(userData);
      await user.save();

      return response.status(201).json(user);
    }
    catch(err){
      const message = 'Erro ao persistir dados!';
      console.log(err)
      return response.status(500).json({err: message});
    }
  }

  public async show({params, response}: HttpContextContract) {
    try {
      const userId = params.id;
      const user = await User.find(userId);
      if(!user) {
        return response.status(200).json({error: 'Registro não econtrado.'})
      }

      return response.status(200).json(user);
    }
    catch (err) {
      const message = 'Erro ao buscar recurso por Id';
      return response.status(500).json({err: message});
    }

  }

  public async update({params, request, response}: HttpContextContract) {
    try {
      const userId = params.id;
      const user = await User.findOrFail(userId);
      user.name = request.input('name');
      user.email = request.input('email');
      user.password = request.input('password');
      await user.save();
      return response.status(200).json(user);
    }
    catch (err) {
      const message = 'Erro ao atualizar registro.'
      return response.status(500).json({err: message})
    }
  }

  public async delete({params, response}: HttpContextContract) {
    try {
      const userId = params.id;
      const user = await User.findOrFail(userId);
      await user.delete();
      return response.status(204).send('');
    }
    catch (err) {
      const message = 'Erro eu excluir registro.';
      return response.status(500).json({err:message});

    }
  }
}
