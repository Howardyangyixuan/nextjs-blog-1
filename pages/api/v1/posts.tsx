import {NextApiRequest, NextApiResponse} from 'next';

console.log('h');
const Posts = (req:NextApiRequest,res:NextApiResponse)=>{
  res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  res.write(JSON.stringify({name:'howard'}))
  res.end()
}
export default Posts