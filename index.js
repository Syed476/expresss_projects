import express, { request, response } from 'express';
import data from "./data/mock.json" assert { type: "json" };

const app = express();
const PORT = 3000;
// using public folder at the root
app.use(express.static("public"));

// using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended:true}));
// post with express.json and express.urlencoded
app.post('/item',(request,response) =>{
    console.log(request.body);
    response.send(request.body);
})

// using images at the route folder /images
app.use('/images',express.static("images"))
// GET
app.get('/',(request,response) =>{
    response.json(data);    
});
// GET - download method
app.get('/download',(request,response) =>{
    response.download("images/rose2.jpg");    
});

// GET - redirect method
app.get('/redirect',(request,response) =>{
    response.redirect("https://www.linkedin.com");    
})

// GET with next()
app.get('/next',(request,response,next) =>{
    console.log("The response will be sent by next function ");
    next();    
}, (request,response) => {
        response.send("a route is setup for second callback")
    }
);
app.route('/class').get((request,response) =>{
    // 
    throw new Error();
})
.post((request,response) =>{
    response.send("create class info ")
})
.put((request,response) =>{
    response.send("update class info ")
});


// // Route chaining
// // GET
// app.get('/class',(request,response) =>{
//     response.send('Retrieve class info')
// });

// //POST
// app.post('/class',(request,response) =>{
//     response.send("create class info ")
// });
// //PUT
// app.put('/class',(request,response) =>{
//     response.send("update class info ")
// });
//DELETE
app.delete('/delete',(request,response) =>{
    response.send("this is a delete request at /delete")
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something is not working')
});

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
    
});