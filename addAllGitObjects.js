
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



addAllGitObjects(process.argv[2])

async function addAllGitObjects(directoryPath){

    // const file =  fs.readFileSync(directoryPath);
    var allFiles=[];


    fs.readdirSync(directoryPath).forEach(function(innerDirName) {

        innerDirPath =  "" + directoryPath + "/" + innerDirName;

        fs.readdirSync(innerDirPath).forEach(function(file)
        {

        filePath =  "" + innerDirPath + "/" + file;
        const fileContent = fs.readFileSync(filePath);

        allFiles.push({
            path: filePath,
            content: fileContent
        });
    })
      });

    cluster.add(
        allFiles,
      {
        "replication-min" : 1,
        "replication-max" : 2,
        "recursive": true
        }
      , (err, result) => {
        err ? console.error(err) : console.log(result)

      })

}

