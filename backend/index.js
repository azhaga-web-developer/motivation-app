const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/youtube',async(req,res)=>{
    try{
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
            params:{
                q:'motivational speech',
                part:'snippet',
                maxResults:10,
                type:'video',
                key:process.env.YOUTUBE_API_KEY,

            },
        });
        res.json(response.data.items);
    }catch(error){
        console.error('Error fetching Youtube data:',error.message);
        res.status(500).send('Failed to fetch videos');
    }
});

app.listen(PORT,()=>{
    console.log(`Backend running at http://localhost:${PORT}`)
})


