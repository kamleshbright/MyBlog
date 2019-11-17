import express from 'express';
import bodyParser from 'body-parser';

const app =  express();
const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes:0,
        comments: [],
    },
    'my-thoughts-on-resumes':{
        upvotes:0,
        comments: [],
    }
}

app.use(bodyParser.json());

app.get('/api/articles/:name',(req, res) => {
    try{
    const articleName = req.params.name;
    res.status(200).send(articlesInfo[articleName]);
    }
    catch (error){
      res.status(500).json ({ message : "Error", error});
    }
});

app.post('/api/articles/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`);
});
app.post('/api/articles/:name/add-comment', (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({ username, text });
    res.status(200).send(articlesInfo[articleName]);
})
//app.get('/hello', (req, res) => res.send('Hello!'));
//app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}!`));
//app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!`));

app.listen(8000, ()=> console.log('Listening on port 8000'));