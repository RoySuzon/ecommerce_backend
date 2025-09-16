
import * as fs from "fs-extra";
import * as path from "path";

// Get feature name from command line
const featureName = process.argv[2];

if (!featureName) {
    console.error("Please provide a feature name.");
    process.exit(1);
}

// Create folder for the feature
const featureDir = path.join(__dirname, "/src/features/" + featureName);
fs.ensureDirSync(featureDir);

// File paths
const serviceFile = path.join(featureDir, `${featureName}.service.ts`);
const controllerFile = path.join(featureDir, `${featureName}.controller.ts`);
const routeFile = path.join(featureDir, `${featureName}.route.ts`);

// Service template
const serviceTemplate = `class ${capitalize(featureName)}Service {
    async insert() {
        // TODO: implement insert logic
    }

    async insertMany() {
        // TODO: implement bulk insert logic
    }

    async update() {
        // TODO: implement update logic
    }

    async delete() {
        // TODO: implement delete logic
    }

    async fetch() {
        // TODO: implement fetch logic
    }
}

export default new ${capitalize(featureName)}Service();
`;

// Controller template
const controllerTemplate = `import { Request, Response } from "express";
import ${featureName}Service from "./${featureName}.service";

class ${capitalize(featureName)}Controller {
    async add(req: Request, res: Response) {
        try {
            const result = await ${featureName}Service.insert();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async addMany(req: Request, res: Response) {
        try {
            const result = await ${featureName}Service.insertMany();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result = await ${featureName}Service.update();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await ${featureName}Service.delete();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }

    async get(req: Request, res: Response) {
        try {
            const result = await ${featureName}Service.fetch();
            return res.success({ data: result, message: "" });
        } catch (error: any) {
            return res.error({ message: error.message, errors: error });
        }
    }
}

export default new ${capitalize(featureName)}Controller();
`;


// Route template
const routeTemplate = `import { Router } from "express";
import ${featureName}Controller from "./${featureName}.controller";

const ${featureName}Route = Router();

${featureName}Route.get("/", ${featureName}Controller.get);
${featureName}Route.post("/", ${featureName}Controller.add);
${featureName}Route.post("/many", ${featureName}Controller.addMany);
${featureName}Route.put("/:id", ${featureName}Controller.update);
${featureName}Route.delete("/:id", ${featureName}Controller.delete);

export default ${featureName}Route;
`;


// Write files
fs.writeFileSync(serviceFile, serviceTemplate);
fs.writeFileSync(controllerFile, controllerTemplate);
fs.writeFileSync(routeFile, routeTemplate);

console.log(`Feature "${featureName}" created successfully at ${featureDir}`);

// Utility function
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
