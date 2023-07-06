const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session')
const redis = require("redis")
let connectRedis = require('connect-redis')
const cors = require('cors')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(express.json())

const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

app.enable("trust proxy")
app.use(cors())
//Configure session middleware
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    resave: false,
    saveUninitialized: false,
    secure: false, // if true only transmit cookie over https
    httpOnly: true, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 10 // session max age in miliseconds
  }
}))

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose.set('strictQuery', false);
mongoose.connect(mongoURL,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
})
.then(() => console.log("Successfully connect to Database"))
.catch((e) => console.log(e))


app.get("/api/v1",(req,res) => {
  res.send("<h1>Hi! Developer, Welcome to the world of Docker & Devops!!</h1>");
  console.log("Load Balanced request");
});

app.use('/api/v1/posts',postRouter)
app.use('/api/v1/users',userRouter)

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on port: ${port}`));