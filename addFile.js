
const ipfsClient = require('ipfs-http-client');
const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const fs = require('fs');
 
const cluster =  ipfsCluster(
    { 
        host: '0.0.0.0', 
        port: '9094',
        protocol: 'http' }
    );


  (async () => {
      console.log(await addFile(process.argv[2]))
    })();


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

