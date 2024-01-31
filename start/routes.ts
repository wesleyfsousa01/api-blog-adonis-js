/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')
  console.log(email, password)

  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch (error) {
    console.log(error);
    return response.unauthorized('Invalid credentials')
  }
})

Route.group(() => {
  Route.get('/users', 'UsersController.index');
  Route.get('/users/:id', 'UsersController.show');
  Route.post('/users', 'UsersController.store');
  Route.patch('/users/:id', 'UsersController.update');
  Route.delete('/users/:id', 'UsersController.delete');
}).middleware(['auth:api'])

Route.group( () => {
  Route.get('/posts', 'PostsController.index');
  Route.get('/posts/:id', 'PostsController.show');
  Route.post('/posts', 'PostsController.store');
  Route.patch('/posts/:id', 'PostsController.update');
  Route.delete('/posts/:id', 'PostsController.delete');
}).middleware(['auth:api'])

Route.group(()=> {
  Route.get('/comments', 'CommentsController.index');
  Route.get('/comments/:id', 'CommentsController.show');
  Route.post('/comments', 'CommentsController.store');
  Route.patch('/comments/:id', 'CommentsController.update');
  Route.delete('/comments/:id', 'CommentsController.delete');
}).middleware(['auth:api'])


