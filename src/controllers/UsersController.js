import User from '../models/User'
import { createPasswordHash } from '../services/auth'

class UsersController {

  async listAll(request, response) {
    try {
      const users = await User.find()
      
      return response.status(200).json(users)
      
    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }
  }
  
  async show(request, response) {
    try {
      const { id } = request.params

      const user = await User.findById(id)

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      return response.status(200).json(user)

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }
  }

  async create(request, response) {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (user) {
        return response
          .status(409)
          .json({message: `User ${email} already exists.`});
      }

      const passwordHash = await createPasswordHash(password);

      const newUser = await User.create({ email, password: passwordHash });
      
      return response.status(201).json(newUser)
      
    } catch (error) {
      console.error('Error:', error.message)
      response.status(500).json('Internal server error.')
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { email, password } = request.body;

      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      const passwordHash = await createPasswordHash(password);

      await user.updateOne({email, password: passwordHash});

      return response.status(200).json()

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }

  }

  async destroy(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findById(id);

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      await user.deleteOne()
  
      return response.status(200).json()
  
    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }
  }

}

export default new UsersController();