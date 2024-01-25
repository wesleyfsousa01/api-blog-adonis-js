import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment';

export default class CommentsController {
    public async index({response}: HttpContextContract) {
      try {
        const comments = await Comment.all();
        return response.status(200).json(comments);
      }
      catch (err) {
        const message = 'Erro ao listar registros.'
        return response.status(500).json({err: message});
      }
    }

    public async store({request, response}: HttpContextContract) {
      try{
        const commentData = request.all();
        const comment = new Comment();
        comment.fill(commentData);
        await comment.save();

        return response.status(201).json(comment);
      }
      catch(err){
        const message = 'Erro ao persistir dados!';
        return response.status(500).json({err: message});
      }
    }

    public async show({params, response}: HttpContextContract) {
      try {
        const commentId = params.id;
        const comment = await Comment.find(commentId);
        if(!comment) {
          return response.status(200).json({error: 'Registro não econtrado.'})
        }

        return response.status(200).json(comment);
      }
      catch (err) {
        const message = 'Erro ao buscar recurso por Id';
        return response.status(500).json({err: message});
      }

    }

    public async update({params, request, response}: HttpContextContract) {
      try {
        const commentId = params.id;
        const comment = await Comment.findOrFail(commentId);
        comment.content = request.input('content');
        await comment.save();
        return response.status(200).json(comment);
      }
      catch (err) {
        const message = 'Erro ao atualizar registro.'
        return response.status(500).json({err: message})
      }
    }

    public async delete({params, response}: HttpContextContract) {
      try {
        const commentId = params.id;
        const comment = await Comment.findOrFail(commentId);
        await comment.delete();
        return response.status(204).send('');
      }
      catch (err) {
        const message = 'Erro eu excluir registro.';
        return response.status(500).json({err:message});

      }
    }
  }
