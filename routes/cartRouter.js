import express from 'express'
import { getAllCustomers, editCustomers } from '../services/costomerService.js'
import { getAllProducts } from '../services/productServer.js'

const router = express.Router()

const BALANCE = process.env.STARTING_BALANCE

router.get("/", async (req, res) => {
    const { customerId } = req.query
    if (!customerId || isNaN(+customerId)) return res.status(400).json({ "success": false, "message": "missing customerId in query" })
    const customers = await getAllCustomers()
    const result = customers.find(c => c.customerId === +customerId)
    if (!result) return res.status(404).json({ "success": false, "message": "customerId not found" })
    res.json({success: true, data: result.cart})
})

router.post("/items", async (req, res) => {
    const customers = await getAllCustomers()
    const products = await getAllProducts()
    const { quantity, customerId, productId } = req.body
    if (!quantity || !Number.isInteger(+quantity) || +quantity <= 0) return res.status(400).json({ "success": false, "message": "wrong quantity" })
    if (!customerId) return res.status(400).json({ "success": false, "message": "missing customerId" })
    if (!productId) return res.status(400).json({ "success": false, "message": "missing productId" })
    const product = products.find(p => p.id === +productId)
    if (!product) return res.status(404).json({ "success": false, "message": "productId not found" })
    if (product.stock - +quantity < 0) return res.status(422).json({ "success": false, "message": "not enough quantity" })
    const cart = { quantity, productId }
    const createdAt = new Date().toISOString()
    let customer = customers.find(c => c.customerId === +customerId)
    if (!customer) {
        customer = {
            customerId: +customerId,
            balance: +BALANCE,
            cart: [],
            createdAt

        }
        customers.push(customer)
        // await editCustomers(customers)
        // return res.status(201).json({ "success": true, "message": "customer created successfuly" })
    }
    customer.cart.push(cart)
    await editCustomers(customers)
    return res.status(201).json({ "success": true, "message": "item added successfully" })

})

router.delete("/items/:productId", async (req, res) => {
    const customers = await getAllCustomers()
    const { customerId } = req.body
    if (!customerId || isNaN(+customerId)) return res.status(400).json({ "success": false, "message": "missing customerId in body" })
    const toUpdate = customers.find(c => c.customerId === +customerId)
    if (!toUpdate) return res.status(404).json({ "success": false, "message": "customerId not found" })
    const {productId} = req.params
    if (!productId) return res.status(400).json({ "success": false, "message": "missing productId in path" })
    const itemIndex = toUpdate.cart.findIndex(i => +i.productId === +productId)
    if (itemIndex === -1) return res.status(404).json({ "success": false, "message": "productId not found" })
    toUpdate.cart.splice(itemIndex, 1)
    await editCustomers(customers)
    return res.sendStatus(204)

})


export default router
