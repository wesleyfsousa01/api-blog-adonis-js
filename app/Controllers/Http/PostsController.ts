import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'


export default class PostsController {
  public async index({response}: HttpContextContract) {
    try {
      const posts = await Post.query().preload('comments');
      return response.status(200).json(posts);
    }
    catch (err) {
      const message = 'Erro ao listar registros.'
      return response.status(500).json({err: message});
    }
  }

  public async store({request, response}: HttpContextContract) {
    try{
      const postData = request.all();
      const post = new Post()
      post.fill(postData);
      await post.save();

      return response.status(201).json(post);
    }
    catch(err){
      const message = 'Erro ao persistir dados!';
      return response.status(500).json({err: message});
    }
  }

  public async show({params, response}: HttpContextContract) {
    try {
      const postId = params.id;
      const post = await Post.find(postId);
      if(!post) {
        return response.status(200).json({error: 'Registro não econtrado.'})
      }

      return response.status(200).json(post);
    }
    catch (err) {
      const message = 'Erro ao buscar recurso por Id';
      return response.status(500).json({err: message});
    }

  }

  public async update({params, request, response}: HttpContextContract) {
    try {
      const postId = params.id;
      const post = await Post.findOrFail(postId);
      post.title = request.input('title');
      post.content = request.input('content');
      await post.save();
      return response.status(200).json(post);
    }
    catch (err) {
      const message = 'Erro ao atualizar registro.'
      return response.status(500).json({err: message})
    }
  }

  public async delete({params, response}: HttpContextContract) {
    try {
      const postId = params.id;
      const post = await Post.findOrFail(postId);
      await post.delete();
      return response.status(204).send('');
    }
    catch (err) {
      const message = 'Erro eu excluir registro.';
      return response.status(500).json({err:message});

    }
  }
}
