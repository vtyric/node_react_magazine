const uuid = require('uuid');
const path = require("path");
const ApiError = require('../error/ApiError');
const {Device, DeviceInfo} = require('../ORM/modelsConnections');
const {where} = require("sequelize");

class DeviceController {
    async create(request, response, next) {
        try {
            let {name, price, brandId, typeId, info} = request.body;
            const {image} = request.files;
            const fileName = uuid.v4() + ".jpg";
            await image.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                await DeviceInfo.create({
                    title: info.title,
                    description: info.description,
                    deviceId: device.id
                });
            }

            return response.json(device);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(request, response) {
        let {brandId, typeId, limit, page} = request.query;
        page = page || 1;
        limit = limit || 9;
        const offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAll({limit, offset});
        }
        if (brandId && !typeId) {
            devices = await Device.findAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await Device.findAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await Device.findAll({where: {brandId, typeId}, limit, offset});
        }

        return response.json(devices);
    }

    async getById(request, response, next) {
        const {id} = request.query;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });

        return device
            ? response.json(device)
            : next(ApiError.badRequest(`нет девайса с таким id(${id})`));
    }

    async delete(request, response, next) {
        const {id} = request.query;
        const device = await Device.findOne({where: {id}});

        if (device) {
            await DeviceInfo.destroy({where: {deviceId: device.id}});
            await Device.destroy({where: {id}});

            return response.json('success');
        }

        return next(ApiError.badRequest(`нет device с таким id(${id})`));
    }
}

module.exports = new DeviceController();