const express = require('express')
const Datastore = require('nedb')

const app = express()
const database = new Datastore('./database.db')

//Load database:
database.loadDatabase()
//Set view engine
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    database.find({},(err,data)=>{
        console.log(data)
        res.render('home',{exam : data.sort((a,b)=>{
            let fa = a.ExamId.toLowerCase()
            let fb = b.ExamId.toLowerCase()
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        }),
        length: data.length})
    })
})
app.post('/',(req,res)=>{
    let query = req.body.input
    database.remove({ExamId : query})
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log('Listening at 3000')
})
