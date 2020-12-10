const express = require('express')
var fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send({ "Message": "OK" })
})

//{http||https}://{hostname}:{port}/create?sizeinmb=40&limit=10

app.get('/create', async (req, res) => {

    var MegaBytes = req.query.sizeinmb || 40; //Size in MB
    var HowManyFiles = req.query.limit || 10; //Number of files

    try{   
        await createFiles(HowManyFiles, MegaBytes); 
        res.send({ "Message": `${HowManyFiles} Files were created `})
    } catch(error){
        res.send({ "Error": error })
    } 
});

//{http||https}://{hostname}:{port}/delete/all

app.get('/delete/all', async (req, res) => {
    try{
        var files = getFiles(__dirname, ".txt")
        files.forEach(file => {
            fs.unlink(file, function(err) {
                if (err) throw err;
                console.log(`${file} deleted`);
              });
        });
        res.send({ "Message": "Files were deleted"})
    } catch(error){
        res.send({ "Error": error })
    } 
});

//Private functions
async function createFiles(HowManyFiles, MegaBytes) {
    for (i = 0; i < HowManyFiles; i++) { 
        var filepath = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + ".txt";
        fs.writeFile(filepath, new Buffer.alloc(1024*1024*MegaBytes), function (err) {
            if (err) return console.log(err);
            console.log('File created with ' + MegaBytes + ' MegaBytes!');
        });
    }
}

function getFiles(path, extension) {
    let files = fs.readdirSync(path);
    return files.filter( file => file.match(new RegExp(`.*\.(${extension})`)));
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})