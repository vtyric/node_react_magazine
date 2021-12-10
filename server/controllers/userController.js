class UserController {
    async registration(request, response) {
        return response.json("registration")
    }

    async login(request, response) {
        return response.json("login");
    }

    async check(request, response) {
        response.json("check");
    }
}

module.exports = new UserController();
