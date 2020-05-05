
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


getAllGitObjects(process.argv[2], process.argv[3])



async function getAllGitObjects(directoryCID, localPath) {



    for await (const file of ipfs.get(directoryCID)) {
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
        for await (const chunk of file.content) {
            content.append(chunk)
        }

        console.log(content)
        // await save(content, localPath+file.path)




        fs.writeFile(file.path, content, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('file saved!');
        });





    }

    if (localPath) {
        try {
            fs.renameSync('./' + directoryCID, localPath)
            console.log("Successfully renamed the directory.")
        } catch (err) {
            console.log(err)
        }
    }


}