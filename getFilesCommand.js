const { exec } = require("child_process");


getFile(process.argv[2], process.argv[3]);



async function getFile(cid, localPath){

process.chdir(localPath);

exec("ipfs get " + cid, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


}