const fs = require('fs');
const http = require('http');
const os = require('os');
const osType = os.type();
console.log(osType);

const htmlContent = `
<!DOCTYPE html>
<html>
<h3>Hello, Wolrd, Your Os type is ${osType} </h3>
</html>
`

const server = http.createServer((req, res) => {
  console.log("Αρχικά δημιουργούμε αρχείο index.html με περιεχόμενα htmlContent");
  fs.writeFile('./index.html', htmlContent, err => {
    if(err) {
      console.log("Problem in writing file", err);
    } else {
      console.log("Διαβαζουμε το αρχείο και το στένουμε πίσω");
      fs.readFile('index.html', 'utf8', (err, content) => {
        if(err) {
          console.log("Problem in reading file", err)
        }
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
      })
    }
  })
})

server.listen(3000, () => {
  console.log("server is listening on port 3000");
})