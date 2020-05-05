
const ipfsClient = require('ipfs-http-client');
const ipfsCluster = require('ipfs-cluster-api');
const encryption = require('./encryption');
const bodyParser = require('body-parser');
const fs = require('fs');

const cluster = ipfsCluster(
  {
    // host: '13.84.154.252', 
    host: '0.0.0.0',
    port: '9094',
    protocol: 'http'
  }
);


(async () => {
  var Files = [
    'final-test/3/file3.txt', 
    // 'final-test/2/file2.txt', 
    // 'final-test/3/file3.txt',
    'final-test/2/pic8.png', 
    'final-test/3/pic9.png', 
    // 'final-test/3/pic6.png.asc'
  ];
  console.log(await addFiles(Files))
  // console.log(await addFile(process.argv[2]))
})();

async function addFiles(paths) {
  var hashes = {}
  for (var i = 0; i < paths.length; i++) {
    hashes[paths[i]] = await addFile(paths[i])
  }
  return hashes
}

async function addFile(directoryPath) {

  var allFiles = [];

  const fileContent = fs.readFileSync(directoryPath);


  let base64Content = new Buffer.from(fileContent, 'binary').toString('base64');

  const fileContentEnc = encryption.symmetricEnc(base64Content);

  const fileContentBuffer = Buffer.from(fileContentEnc, 'utf8');

  // fs.writeFile(directoryPath+'.asc', fileContentBuffer, (err) => {
  //   // throws an error, you could also catch it here
  //   if (err) throw err;

  //   // success case, the file was saved
  //   console.log('file saved!');
  // });



  let response;

  try {

    response = await cluster.add(
      {
        path: directoryPath,
        content: fileContentBuffer
      },
      {
        "replication-min": 1,
        "replication-max": 2,
        "recursive": true
      });

    console.log(response)

    const CID = response[0].hash;

    cluster.status(CID, (err, res) => {
      err ? console.error(err) : console.log(res)
    })

    return response[0].hash;


  } catch (e) {
    console.error(e);
  }

}

