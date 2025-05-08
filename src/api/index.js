import fs from 'fs';
import path from 'path';

export default (app) => {
  const routesPath = path.dirname(new URL(import.meta.url).pathname);
  fs.readdirSync(routesPath).forEach(async (folder) => {
    const fullPath = path.join(routesPath, folder, `${folder}.routes.js`);
    if (fs.existsSync(fullPath)) {
      const route = await import(fullPath);
      app.use(`/api/${folder}`, route.default || route);
    }
  });
};
