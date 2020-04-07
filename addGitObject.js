
const ipfsClient = require('ipfs-http-client');
const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const fs = require('fs');
 
const cluster =  ipfsCluster(
    { 
        host: '0.0.0.0', 
        port: '9094',
        protocol: 'http' }
    )



addGitObject(process.argv[2], process.argv[3], process.argv[4])

async function addGitObject(directoryPath, innerDirectoryName, fileName){


    filePath =  "" + directoryPath + "/" + innerDirectoryName + "/" + fileName;
    const fileContent = fs.readFileSync(filePath);

    let file = {
        path: filePath,
        content: fileContent
    };

    cluster.add(
        file,
      {
        "replication-min" : 1,
        "replication-max" : 2,
        "recursive": true
        }
      , (err, result) => {
        err ? console.error(err) : console.log(result)

      })

}

