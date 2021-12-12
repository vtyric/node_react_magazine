const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../ORM/modelsConnections');

const generateJwt = (id, email, role) =>
    jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'});

class UserController {
    async registration(request, response, next) {
        const {email, password, role} = request.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.email, user.role);

        return response.json({token});
    }

    async login(request, response, next) {
        const {email, password} = request.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const user = await User.findOne({where: {email}});
        if (!user) {
            next(ApiError.internal('Пользователь с таким email не найден'));
        }
        if (bcrypt.compareSync(password, user.password)) {
            next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);

        return response.json({token});
    }

    async check(request, response, next) {
        response.json(['чек']);
    }
}

module.exports = new UserController();
