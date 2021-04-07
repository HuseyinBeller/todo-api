const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,

          dbConnectionStr = process.env.DB_STRING,
          dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
          .then(client => {
                    console.log(`Hey, connected to ${dbName} database`);
                    db = client.db(dbName);
          })
          .catch(err => {
                    console.log(err);
          })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
          const todoItems = await db.collection('todos').find().toArray()

          // Kaç tane document kaldıgını ogreniyoruz false için dbde başka bi request atmış oluyoruz find diyip completed false olanları buluyoruz count them diyoruz countDocuments ile
          const itemsLeft = await db.collection('todos').countDocuments({ completed: false })
          // databasedeki zebra ile key verdik datadaki verileri key value pair sayesinde alıyoruz data zebra key(property yani) veriler verileri alıyoruz html'e yani (ejs'e) gonderiyoruz  ve left propertysini ejs'sin içinde verdik oradan ulaşıyor
          res.render('index.ejs', { zebra: todoItems, left: itemsLeft })
})



app.post('/createTodo', (req, res) => {
          db.collection('todos').insertOne({ todo: req.body.todoItem, completed: false })
                    .then(result => {
                              console.log('Todo has been added!');
                              res.redirect('/')
                    })
})



// Update APİ Yaptık.
app.put('/markComplete', (req, res) => {
          db.collection('todos').updateOne({ todo: req.body.rainbowUnicorn }, {
                    $set: {
                              completed: true
                    }
          })
                    .then(result => {
                              console.log('Marked Compled')
                              res.json('Marked Complete')
                    })
})

// Uncomplate Update APİSİ back to false yapıyoruz burada
app.put('/undo', (req, res) => {
          db.collection('todos').updateOne({ todo: req.body.rainbowUnicorn }, {
                    $set: {
                              completed: false
                    }
          })
                    .then(result => {
                              console.log('Marked Compled')
                              res.json('Marked Complete')
                    })
})





app.delete('/deleteTodo', (req, res) => {

          // DeleteOne güzel yani Passing Object try to find a match verdigimiz propertsinden alıcak.
          db.collection('todos').deleteOne({ todo: req.body.rainbowUnicorn })
                    .then(result => {
                              console.log('Deleted Todo');

                              // Fetch olduğu zaman respond ile cevap vermemiz lazım
                              res.json('Deleted IT')
                    })
                    .catch(err => console.log(err))
})




app.listen(process.env.PORT || PORT, () => {
          console.log('Server is running, you better catch it!')
})