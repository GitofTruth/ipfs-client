
const ipfsClient = require('ipfs-http-client');
const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const fs = require('fs');
 
const cluster =  ipfsCluster(
    { 
        // host: '13.84.154.252', 
        host: '0.0.0.0',
        port: '9094',
        protocol: 'http' }
    );


  (async () => {
      var Files = ['ipfs-test/1/file1.txt' , 'ipfs-test/2/file2.txt', 'ipfs-test/3/file3.txt' ];
      console.log(await addFiles(Files))
    })();

async function addFiles(paths){
  var hashes = {}
  for (var i = 0; i < paths.length; i++){
    hashes[paths[i]] = await addFile(paths[i])
  }
  return hashes
}

async function addFile(directoryPath){

    // const file =  fs.readFileSync(directoryPath);
    var allFiles=[];

    const fileContent = fs.readFileSync(directoryPath);


      let response;

      try{

        response = await cluster.add(
        {
            path: directoryPath,
            content: fileContent
        },
      {
        "replication-min" : 1,
        "replication-max" : 2,
        "recursive": true
            });

        console.log(response)

        const CID = response[0].hash;
 
        cluster.status(CID, (err, res) => {
            err ? console.error(err) : console.log(res)
        })

        return response[0].hash;
        

      }catch(e){
        console.error(e);
        }

}

