const encryption = require('./encryption.js')
const fs = require('fs');


encryptFile(process.argv[2])

function encryptFile(directoryPath) {

  
    const fileContent = fs.readFileSync(directoryPath);

    let base64Content = new Buffer.from(fileContent, 'binary').toString('base64');

    const fileContentEnc = encryption.symmetricEnc(base64Content);
  
    // const fileContentBuffer = Buffer.from(fileContentEnc, 'utf8');
  
    fs.writeFileSync(directoryPath+'.asc', fileContentEnc);

}