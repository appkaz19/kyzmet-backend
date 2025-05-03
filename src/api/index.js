const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  const routesPath = __dirname;
  fs.readdirSync(routesPath).forEach((folder) => {
    const fullPath = path.join(routesPath, folder, `${folder}.routes.js`);
    if (fs.existsSync(fullPath)) {
      const route = require(fullPath);
      app.use(`/api/${folder}`, route.default || route);
    }
  });
};
