

const { BufferListStream } = require('bl')


const ipfsClient = require('ipfs-http-client');
//const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

const BufferList = require('bl/BufferList')
const save = require('save-file')

const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'

const StringDecoder = require('string_decoder').StringDecoder;
const encryption = require('./encryption');




var ipfs = new ipfsClient(
  {
    host: '0.0.0.0',
    port: '5001',
    protocol: 'http'
  }
);



// getFile(process.argv[2], process.argv[3])

(async () => {
  // var Files = {
  //   'ipfs-test/1/file4.txt': 'QmaEeRvqPfHGHQDBXCykGSe5oZgkCE5onuVqYVMcpeeoo6',
  //   'ipfs-test/2/file5.txt': 'QmaWYCE6D68ksZnSh5L12FAiPHxKE7HLny9JjS4Q2ov6de',
  //   'ipfs-test/3/file6.txt': 'QmW9g8uq43EiXhFiqVDVYY4Yb73XPJRukR8sJYJdFAjVTG'
  // };
  var Files = {
    'final-test/3/file3.txt': 'QmP6MJa4ghNQXyqwXehDRSmfBxJFftwgjQ1E4kCw5zsY2w',
    'final-test/2/pic8.png': 'QmP7JfZKAMtqDcufL1g3tJtan77WrSHJQ8j34kYqXUnADj',
    'final-test/3/pic9.png': 'QmdT7fwAzkRjqHUH4QaqfreFVYEBHHnMThfHJaPJE3jvpT'
  };

  // await getFile(process.argv[2])
  await getFiles(Files)
})();


async function getFiles(filesMap) {
  for (var filePath in filesMap) {
    await getFile(filesMap[filePath], filePath);
  }
}

async function getFile(CID, localPath) {

  let decoder = new StringDecoder('utf8');


  if (!localPath) {
    localPath = ""
  }

  for await (const file of ipfs.get(CID)) {
    // console.log(file.path)
    console.log(file)

    if (!file.content) {

      if (!fs.existsSync(file.path)) {
        // Do something
        fs.mkdir(file.path,
          { recursive: true }, (err) => {
            if (err) {
              return console.error(err);
            }
            console.log('Directory created successfully!');
          });

      }
      continue;
    }

    const content = new BufferList()
    let contentStr = '';
    for await (const chunk of file.content) {
      // content.append(chunk)
      contentStr += chunk.toString('utf8');
    }

    // console.log(content)

    // console.log(contentStr);

    contentStrDec = encryption.symmetricDec(contentStr);



    fs.mkdirSync(path.dirname(localPath), { recursive: true });


    fs.writeFile(localPath, contentStrDec, 'base64' ,(err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('file saved!');
    });

  }

}


