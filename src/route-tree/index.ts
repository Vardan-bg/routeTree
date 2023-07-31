import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse as parseJson } from 'json5';
import * as path from 'path';

export function routeTree(options: any): Rule {
  // Set a default value for the "path" option if it's not provided
  const defaultPath = 'src/app';

  // Use the provided "path" option or the default value
  const selectedPath = options && options.path ? options.path : defaultPath;
  return (tree: Tree, context: SchematicContext) => {
    // Get the path to the routes-routing.module file
    const routeModulePath = path.join(selectedPath, 'routes-routing.module.ts');

    // Read the file content
    const content = tree.read(routeModulePath);

    if (content) {
      // Convert the file content to string and parse it as JSON
      const routes = parseJson(content.toString());

      // Do any additional processing to generate the JSON tree of routes
      // For example, you can traverse the parsed routes object and create a tree structure.

      // Create a new file in the project to store the generated JSON tree
      const outputPath = path.join('src', 'app', 'generated-routes.json');
      tree.create(outputPath, JSON.stringify(routes, null, 2));
    } else {
      context.logger.error(`File not found: ${routeModulePath}`);
    }

    return tree;
  };
}