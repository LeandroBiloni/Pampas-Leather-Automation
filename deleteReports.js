const fs = require('fs');
const path = require('path');

// Rutas a los directorios de reportes
const reportDirs = ['allure-results', 'allure-report'];

// Función para eliminar archivos y directorios recursivamente
function deleteContentsRecursively(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // Recurse
        deleteContentsRecursively(curPath);
        fs.rmdirSync(curPath);
      } else { // Delete file
        fs.unlinkSync(curPath);
      }
    });
  }
}

reportDirs.forEach((dir) => {
  const reportDir = path.join(__dirname, dir);

  if (fs.existsSync(reportDir)) {
    deleteContentsRecursively(reportDir);
    console.log(`Contenido del directorio ${dir} eliminado exitosamente.`);
  } else {
    console.log(`El directorio ${dir} no existe.`);
  }
});
