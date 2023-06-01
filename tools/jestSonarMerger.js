const { create } = require('xmlbuilder2');
const glob = require('glob');
const fs = require('fs');

async function readableToString(readable) {
  let result = "";
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const mergeToString = function (srcStrings, options) {
  const targetDoc = create({
    testExecutions: { '@version': '1' }
  });

  srcStrings.forEach((srcString) => {
    const doc = create(srcString, {});

    doc.root().each(
      (xmlBuilder) => {
        if (xmlBuilder.node.nodeName.toLowerCase() === 'file') {
          targetDoc.root().import(xmlBuilder);
        }
      },
      true,
      true
    );
  })

  return targetDoc.end({
    headless: true,
    prettyPrint: true,
    noDoubleEncoding: true
  });
};

const getXmlFiles = function (src) {
  return new Promise((resolve, reject) => {
    glob(`${src}/*.xml`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

(async function() {
  const files = await getXmlFiles('build/test-results/jest');
  const srcStreams = files.map(file => {
    return fs.createReadStream(file, {
      flags: 'r',
      encoding: 'utf8',
      autoClose: true
    });
  });

  const destStream = fs.createWriteStream('./build/test-results/test-report.xml', {
    flags: 'w',
    encoding: 'utf8',
    autoClose: true
  });

  const srcStrings = await Promise.all(srcStreams.map(readableToString));
  const destString = mergeToString(srcStrings);
  destStream.write(destString, 'utf8', (err) => {
    if (err) {
      console.error(err);
    }

    destStream.end();
    console.log('Files merged successfully!');
  });
})();
