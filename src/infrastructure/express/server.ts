import express from 'express';

const server = express();

server.get('/get', async (req, res, next) => {
    res.send(req.subdomains);
})

server.post("/send", async (req, res, next) => {
    
})

export default server