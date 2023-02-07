import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";


const app = express()
const PORT = process.env.PORT || 5050
app.use(express.json())
app.use(cors())
dotenv.config()

const configuration = new Configuration({
	organization: process.env.ORGANIZATION_ID,
	apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);


app.get('/',(req,res)=>{
	res.status(200).send("OpenAI api demo")
})


app.post('/code',async (req,res)=>{
	const response = await openai.createCompletion(
		{
		  "model": "text-davinci-003",
		  "prompt": req.body.prompt,
		  "max_tokens": 2000,
		}
	);

	console.log(response.data)
	const data = response.data.choices[0].text

	res.status(200).send({status:'ok',data})
})

app.listen(PORT,()=>{
	console.log("Listening on",PORT)
})