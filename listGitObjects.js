
const ipfsClient = require('ipfs-http-client');
//const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const fs = require('fs');

const BufferList = require('bl/BufferList')
const save = require('save-file')

//const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'


var ipfs = new ipfsClient(
    {
        host: '0.0.0.0',
        port: '5001',
        protocol: 'http'
    }
);

(async () => {
    console.log(await listGitObjects(process.argv[2]))
  })();


async function listGitObjects(cid){
    let allFiles=[];
    let allDirs=[];
    let allHashes =[];

    for await (const dir of ipfs.ls(cid)) {
        // console.log(file.path)
        console.log(dir)

        allDirs.push(dir.name);
      
        // console.log(content.toString())

        for await (const file of ipfs.ls(dir.path))
        {
            console.log(file)

            allFiles.push(file.name)
            allHashes.push(dir.name+file.name)
        }
      }

      return {
        allDirsNames: allDirs,
        allFilesNames: allFiles,
        allObjectsHashes: allHashes
      };
    
}

