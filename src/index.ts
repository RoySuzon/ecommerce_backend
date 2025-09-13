import cors from "cors";
import express from "express";
import productRoute from "./features/product/product.route";

const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());


app.use('/product', productRoute)


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
