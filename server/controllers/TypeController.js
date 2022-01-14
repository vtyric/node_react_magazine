const {Type} = require('../ORM/modelsConnections');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(request, response) {
        const {name} = request.body;
        const type = await Type.create({name});

        return response.json(type);
    }

    async getAll(request, response) {
        const types = await Type.findAll();

        return response.json(types);
    }

    async delete(request, response, next) {
        const {id} = request.query;
        const type = await Type.destroy({where: {id}});

        return !type
            ? next(ApiError.badRequest(`пользователь с таким id(${id}) не найден`))
            : response.json('success');
    }
}

module.exports = new TypeController();