
import User from "../models/User";
import Repository from "../models/Repository"

class RepositoryController {
  async listAllRepositoriesOfAnUser(request, response) {
    try {
      const { userId } = request.params;
      const { q } = request.query;

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      let query = {};

      if (q) {
        query = { url: { $regex: q }}
      }

      const repositories = await Repository.find({
        userId: userId,
        ...query
      });

      return response.status(200).json(repositories)

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }

  }

  async create(request, response) {
    try {
      const { userId } = request.params
      const { url } = request.body

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      const repository = await Repository.findOne({ userId, url })

      if (repository) {
        return response.status(409).json({message: 'Repository already exists.'})
      }

      const git = url.includes('github')
      const gitlab = url.includes('gitlab')

      if (!git && !gitlab) {
        return response.status(400).json({message: 'Your url is invalid.'})
      }

      const urlPieces = url.split('/')
      const proprietario = urlPieces[urlPieces.length - 2]
      const nomeRepositorio = urlPieces[urlPieces.length - 1]

      const newRepository = await Repository.create({name: nomeRepositorio, proprietario, url, userId})

      return response.status(200).json(newRepository);

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }


  }

  async destroy(request, response) {
    try {
      const { userId, repoId } = request.params

      const user = await User.findById(userId);

      if (!user) {
        return response.status(404).json({message: 'User not found.'})
      }

      const repository = await Repository.findById(repoId)

      if (!repository) {
        return response.status(404).json({message: 'Repository not found.'})
      }

      await repository.deleteOne()

      return response.status(200).json()

    } catch (error) {
      console.error('Error:', error.message)
      return response.status(500).json('Internal server error.')
    }

  }

}

export default new RepositoryController();