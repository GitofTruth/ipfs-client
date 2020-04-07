


const ipfsClient = require('ipfs-http-client');
//const ipfsCluster = require('ipfs-cluster-api');

const bodyParser = require('body-parser');
const fs = require('fs');

const BufferList = require('bl/BufferList')
const save = require('save-file')

const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'


var ipfs = new ipfsClient(
    {
        host: '0.0.0.0',
        port: '5001',
        protocol: 'http'
    }
);



getGitObject(process.argv[2], process.argv[3], process.argv[4], process.argv[5])



async function getGitObject(directoryCID, innerDirectoryName, fileName, localPath){

    if (!localPath){
        localPath = ""
    }

    for await (const file of ipfs.get(directoryCID + '/' + innerDirectoryName + '/'+ fileName)) {
        // console.log(file.path)
        console.log(file)
        
        if (!file.content) continue;
      
        const content = new BufferList()
        for await (const chunk of file.content) {
          content.append(chunk)
        }
        await save(content, localPath+file.path)
      
        // console.log(content.toString())
      }
    
}


