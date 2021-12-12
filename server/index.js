require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const models = require('./ORM/modelsConnections');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;
const app = new express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/swagger', swagger.serve, swagger.setup(swaggerDoc));

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
