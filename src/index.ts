import dotenv from 'dotenv'
import { Oso } from 'oso-cloud';

dotenv.config()

const apiKey = process.env.OSO_KEY as string;

const oso = new Oso('https://cloud.osohq.com', apiKey)

const authorized = await oso.authorize(
    {type:'User', id: 'Peter'},
    'edit',
    {type:'Issue',id: 'tps-reports-99'}
)
console.log(authorized)

// await oso.insert([
//     "has_relation",
//     {type:"Issue",id: "tps-reports-99"},
// 'creator',
// {type:"User", id: "Peter"},
// ]
// );
