import cors from "cors";
import express from "express";
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../swagger-output.json';
import productRoute from "./features/product/product.route";

// require("../swagger");;

const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());


app.use('/product', productRoute)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));



app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
