import cors from "cors";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';
import brandRoute from "./features/brand/brand.route";
import categoryRoute from "./features/category/category.route";
import commonRoute from "./features/common/common.route";
import productRoute from "./features/product/product.route";
import specificationtypeRoute from "./features/specificationtype/specificationtype.route";
import productVariantRoute from "./features/variant/productVariant.route";
import { responseMiddleware } from "./middlewares/apiResponse";

// require("../swagger");;

const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());
app.use(responseMiddleware)

app.use('/product', productRoute)
app.use('/category', categoryRoute)
app.use('/brand', brandRoute)
app.use('/variant', productVariantRoute)
app.use('/common', commonRoute)
app.use('/specificationtype', specificationtypeRoute)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));



app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
