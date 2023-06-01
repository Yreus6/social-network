const glob = require('glob');
const fs = require('fs');
const { exec } = require('child_process');

const getJsonFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/**/coverage-final.json`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

(async function(){
  if (fs.existsSync('.nyc_output')) {
    fs.rmdirSync('.nyc_output', { recursive: true, force: true });
  }
  if (fs.existsSync('reports')) {
    fs.rmdirSync('reports', { recursive: true, force: true });
  }
  fs.mkdirSync('.nyc_output');
  fs.mkdirSync('reports');

  const files = await getJsonFiles('coverage');
  files.forEach((file, index) => {
    fs.copyFileSync(file, `reports/coverage-final-${index}.json`);
  });
  exec('nyc merge reports', (err) => {
    if (err) {
      console.error(err);
      fs.rmdirSync('.nyc_output', { recursive: true, force: true });
      fs.rmdirSync('reports', { recursive: true, force: true });
      return;
    }

    fs.renameSync('./coverage.json', './.nyc_output/out.json');
    fs.rmdirSync('reports', { recursive: true, force: true });

    console.log('Files merged successfully!');
  });
})();
