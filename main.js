import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import ordersRouter from './routes/ordersRouter.js'

const app = express()

app.use(express.json())

app.use("/cart", cartRouter)

app.use("/products", productsRouter)

app.use("/orders", ordersRouter)

app.get("/", (req, res)=>{
    res.end("Wellcome to the online clothing store")
})


app.get("/health", (req, res)=>{
    res.end("The server is runing properly")
})



app.listen(3000, ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    console.log("server runing...");
    
})