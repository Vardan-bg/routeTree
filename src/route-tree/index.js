"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTree = void 0;
const json5_1 = require("json5");
const path = require("path");
function routeTree(options) {
    return (tree, context) => {
        // Get the path to the routes-routing.module file
        const routeModulePath = path.join(options.path, 'routes-routing.module.ts');
        // Read the file content
        const content = tree.read(routeModulePath);
        if (content) {
            // Convert the file content to string and parse it as JSON
            const routes = (0, json5_1.parse)(content.toString());
            // Do any additional processing to generate the JSON tree of routes
            // For example, you can traverse the parsed routes object and create a tree structure.
            // Create a new file in the project to store the generated JSON tree
            const outputPath = path.join('src', 'app', 'generated-routes.json');
            tree.create(outputPath, JSON.stringify(routes, null, 2));
        }
        else {
            context.logger.error(`File not found: ${routeModulePath}`);
        }
        return tree;
    };
}
exports.routeTree = routeTree;
//# sourceMappingURL=index.js.map