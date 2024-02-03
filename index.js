const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/nodeexpressdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.get('/', (req, res) => {
  UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('/get/:id', (req, res) => { // get user by id
  const id = req.params.id
  UserModel.findById({_id: id })
        .then(user => res.json(user))
        .catch(err => console.log(err))
});

app.get('/getByName/:name', (req, res) => { //get user by name
  const name = req.params.name;
  UserModel.findOne({ name: name })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/create', (req, res) => { //create a new user
  UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => console.log(err))
});

app.put('/update/:id', (req, res) => { //update by id 
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id:id}, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    address: {
      city: req.body.city,
      zipCode: req.body.zipCode
    }
  })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});


app.delete('/deleteuser/:id', (req, res) => { //delete user by id
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
    .then(user => res.json({ message: 'User deleted successfully', deletedUser: user }))
    .catch(err => res.json(err));
});

app.delete('/deleteByName/:name', (req, res) => { //delete user by name
  const name = req.params.name;
  UserModel.findOneAndDelete({ name: name })
    .then(user => {
      res.json({ message: 'User deleted successfully', deletedUser: user });
    })
    .catch(err => res.json(err));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
