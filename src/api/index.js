import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  fs.readdirSync(__dirname).forEach(async (folder) => {
    const fullPath = path.join(__dirname, folder, `${folder}.routes.js`);

    if (fs.existsSync(fullPath)) {
      const route = await import(`file://${fullPath.replace(/\\/g, '/')}`);
      app.use(`/api/${folder}`, route.default || route);
    }
  });
};
