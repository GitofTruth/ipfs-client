const encryption = require('./encryption.js')
const fs = require('fs');


decryptFile(process.argv[2])

function decryptFile(directoryPath) {

  
    const fileContent = fs.readFileSync(directoryPath);
    const fileContentDec = encryption.symmetricDec(fileContent.toString('utf8'));
  
    // const fileContentBuffer = Buffer.from(fileContentDec, 'utf8');

    let newPath = directoryPath.substring(0,directoryPath.length-4)
  
    fs.writeFileSync(newPath, fileContentDec, 'base64')
}