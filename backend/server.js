//Подключаем пакеты
const express = require('express') 
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express() //Создаем приложение
const port = process.env.PORT || 5000 //Выбираем порт, по дефолту - 5000

app.use(cors())
app.use(express.json())

//Подключаем mongoDB
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', ()=> {
    console.log("MongoDB connected")
})

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')

app.use('/user', userRouter)
app.use('/posts' , postRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)

//Запуска приложения
app.listen(port, ()=> {
    console.log(`Port  ${port}`)
})