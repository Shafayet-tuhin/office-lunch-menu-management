const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.PAYMENT_KEY);

app.use(cors());
app.use(express.json());

///////////////varify jwt start///////////////////////////

const varifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' });
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    req.decoded = decoded;
    next();
  });
};

///////////////varify jwt end ///////////////////////////

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.DB_USER;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  const db = client.db("tuhin_restaurant");
  const menuCollection = db.collection("menu");
  const reviewCollection = db.collection("reviews");
  const cartCollection = db.collection("cart");
  const usersCollection = db.collection("users");
  const paymentCollection = db.collection("payment");

  //////////JWT Authentication////////////

  app.post('/jwt', (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_TOKEN, { expiresIn: '12h' });
    res.send({ token });
  });

  //////////JWT Authentication////////////

  /////////////////////menu start ////////////////

  app.get('/menu', async (req, res) => {
    const result = await menuCollection.find().toArray();
    res.send(result);
  });

  app.get('/menu/:id', async (req, res) => {
    const id = req.params.id;
    const result = await menuCollection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  });

  app.post('/menu', async (req, res) => {
    const menuItem = req.body;
    const result = await menuCollection.insertOne(menuItem);
    res.send(result);
  });

  app.delete('/menu/:id', async (req, res) => {
    const id = req.params.id;
    const result = await menuCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  });

  app.put('/menu/:id', async (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    console.log(id, updatedItem); 
    const result = await menuCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedItem });
    res.send(result);
  });

  /////////////////////menu end //////////////

  app.get('/reviews', async (req, res) => {
    const result = await reviewCollection.find().toArray();
    res.send(result);
  });

  ////////////////////// CARTS //////////////////////

  app.get('/carts', varifyJWT, async (req, res) => {
    const email = req.query.email;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(401).send({ error: true, message: 'Forbidden access' });
    }

    const query = { email: email };
    const result = await cartCollection.find(query).toArray();
    res.send(result);
  });

  app.post('/carts', async (req, res) => {
    const cartItem = req.body;
    const result = await cartCollection.insertOne(cartItem);
    res.send(result);
  });

  app.delete('/carts/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await cartCollection.deleteOne(query);
    if (result.deletedCount === 0) {
      return res.status(404).send("Item not found");
    }
    res.send(result);
  });

  console.log("Connected to MongoDB and server is running");

  //////////////users//////////////////////////////

  app.get('/users', async (req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
  });

  app.post('/users', async (req, res) => {
    const user = req.body;
    const query = { email: user.email };
    const userExists = await usersCollection.findOne(query);
    if (userExists) {
      return res.send("User already exists");
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  });

  app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { role } = req.body;

    const query = { _id: new ObjectId(id) };
    const update = { $set: { role: role } };
    const result = await usersCollection.updateOne(query, update);
    res.send(result);
  });

  app.get('/users/:email', async (req, res) => {
  
    const email = req.params.email;
    const query = { email };
    const result = await usersCollection.findOne(query);
    if (!result) {
      return res.status(404).send("User not found");
    }
    res.send(result);
  });

  //////////////users ends//////////////////////////////

  //////////////////////Payment Starts////////////////////////

  app.post("/create-payment-intent", async (req, res) => {
    try {
        const { price } = req.body;
        const amount = Math.round(price * 100); // converting to cents and rounding

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
});



  app.post('/payment', async (req, res) => {
    const paymentInfo = req.body;
    const result = await paymentCollection.insertOne(paymentInfo);

    if (result.insertedId) {
      const email = paymentInfo.email; 
      const deleteResult = await cartCollection.deleteMany({ email });
      res.send({ paymentResult: result, deleteResult });
    } else {
      res.status(500).send("Payment record insertion failed");
    } 
  });

  //////////////////////Payment Ends/////////////////////////
 

  //////////////////////Payment History///////////////////////// 

  app.get('/payment/:email',varifyJWT , async (req, res) => {

    const email = req.params.email;

    if (!email) {
      return res.status(400).send("Email is required");
    }

    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(401).send({ error: true, message: 'Forbidden access' });
    }


          const query = { email }; 
          const result = await paymentCollection.find(query).toArray();
          res.send(result); 
       
  })

  //////////////////////Payment History/////////////////////////





}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
