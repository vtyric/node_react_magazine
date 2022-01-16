const {Brand} = require("../ORM/modelsConnections");
const ApiError = require("../error/ApiError");

class BrandController {
    async create(request, response) {
        const {name} = request.body;
        const brand = await Brand.create({name});

        return response.json(brand);
    }

    async getAll(request, response) {
        const brands = await Brand.findAll();

        return response.json(brands);
    }

    async delete(request, response, next) {
        const {id} = request.query;
        const brand = await Brand.destroy({where: {id}});

        return !brand
            ? next(ApiError.badRequest(`пользователь с таким id(${id}) не найден`))
            : response.json('success');
    }
}

module.exports = new BrandController();