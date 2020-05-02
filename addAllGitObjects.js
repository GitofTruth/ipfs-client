
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
      console.log(await addAllGitObjects(process.argv[2]))
    })();


async function addAllGitObjects(directoryPath){

    // const file =  fs.readFileSync(directoryPath);
    var allFiles=[];
    var allHashes={};


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

      let response;

      try{

        console.log(allFiles)

        response = await cluster.add(
        allFiles,
      {
        "replication-min" : 1,
        "replication-max" : 2,
        "recursive": true
        });

        // console.log(response)

    
        for (var i = 0; i < response.length; i++) {
          console.log(response[i]);
        
          if(fs.lstatSync(response[i].path).isFile())
            // TODO : only hash name
            allHashes[response[i].path] = response[i].hash;
        }

        // const CID = response[response.length-1].hash;
 
        // cluster.status(CID, (err, res) => {
        //     err ? console.error(err) : console.log(res)
        // })

        return allHashes;
        

      }catch(e){
        console.error(e);
        }

}

