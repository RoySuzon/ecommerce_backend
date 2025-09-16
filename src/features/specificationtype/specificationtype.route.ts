import { Router } from "express";
import specificationtypeController from "./specificationtype.controller";

const specificationtypeRoute = Router();

specificationtypeRoute.get("/", specificationtypeController.get);
specificationtypeRoute.post("/", specificationtypeController.add);
specificationtypeRoute.post("/many", specificationtypeController.addMany);
specificationtypeRoute.put("/:id", specificationtypeController.update);
specificationtypeRoute.delete("/:id", specificationtypeController.delete);

export default specificationtypeRoute;
