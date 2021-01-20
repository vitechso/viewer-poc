import axios from 'axios'
import https from 'https'
import Cors from 'cors'
import initMiddleware from '@ql/lib/init-middleware'

//Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST'],
  })
)

export default async function handler(req, res) {
  console.log('entering batch handler')
  await cors(req, res)

  if (req.method === 'POST') {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Api-Key': 'e74fb723-a022-4f77-a2bd-abfc0207a1b5'
        })
      })
    })
    await instance.post('https://api20210115154420.azurewebsites.net/api/batch', req.body)
      .then(response => {
        console.log('calling batch api')
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(response.data)
      });
  } else {
    console.log('method not allowed')
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json')
    res.status(405).json({ notAllowed: 'method not allowed' });
  }
}