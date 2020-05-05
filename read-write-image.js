const fs = require('fs')
const path = require('path')

readWriteImage(process.argv[2])

function readWriteImage(directoryPath){

    const fileContent = fs.readFileSync(directoryPath);
    // const fileContentEnc = encryption.symmetricEnc(fileContent.toString('utf8'));
  
    // const fileContentBuffer = Buffer.from(fileContentEnc, 'utf8');

    let base64Image = new Buffer.from(fileContent, 'binary').toString('base64');

  
    fs.writeFileSync(path.dirname(directoryPath)+'/new-pic.png', base64Image, 'base64');
}