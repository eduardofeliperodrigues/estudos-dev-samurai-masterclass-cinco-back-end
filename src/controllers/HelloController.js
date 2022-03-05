class HelloController {
  async index(request, response) {
    return response.json({
      message: "Hello Word"
    })
  }
}

export default new HelloController();