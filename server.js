var https = require('https');
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

var fs = require('fs');

const port = 8800

var options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on https://localhost:${port}`)
  })
})