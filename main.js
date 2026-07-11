import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import ordersRouter from './routes/ordersRouter.js'
import {getAllCustomers} from './services/costomerService.js'

const app = express()

app.use(express.json())

app.use("/cart", cartRouter)

app.use("/products", productsRouter)

app.use("/orders", ordersRouter)

app.get("/", (req, res)=>{
    res.json({"success": true, "message": "Wellcome to the online clothing store"})
})


app.get("/health", (req, res)=>{
    res.json({"success": true, "message": "The server is runing properly"})
})

app.get("/account/balance", async (req, res)=>{
    const { customerId } = req.query
    if (!customerId || isNaN(+customerId)) return res.status(400).json({"success": false, "message": "missing customerId"})
    const customers = await getAllCustomers()
    const customer = customers.find(c=>c.customerId === +customerId)
    if(!customer) return res.status(400).json({"success": false, "message": "customerId not found"})
    res.json({"success": true, "data": customer.balance})
    
})

app.listen(3000, ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    console.log("server runing...");
    
})