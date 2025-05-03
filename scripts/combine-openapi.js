const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// Загрузка базового openapi (без paths)
const basePath = path.join(__dirname, "../src/docs/openapi.base.yaml");
const baseContent = fs.readFileSync(basePath, "utf8");
const openapi = yaml.parse(baseContent);

// Загрузка всех модулей из /modules
const modulesDir = path.join(__dirname, "../src/docs/modules");
const files = fs.readdirSync(modulesDir);

files.forEach((file) => {
  if (file.endsWith(".yaml") || file.endsWith(".yml")) {
    const filePath = path.join(modulesDir, file);
    const moduleContent = fs.readFileSync(filePath, "utf8");
    const parsed = yaml.parse(moduleContent);
    openapi.paths = {
      ...openapi.paths,
      ...parsed,
    };
  }
});

// Сохраняем объединённый openapi.yaml
const outputPath = path.join(__dirname, "../src/docs/openapi.yaml");
fs.writeFileSync(outputPath, yaml.stringify(openapi));
console.log("✅ openapi.yaml успешно собран из модулей");