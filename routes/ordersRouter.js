import express from 'express'
import { getAllCustomers, editCustomers } from '../services/costomerService.js'
import { getAllProducts, editProducts } from '../services/productServer.js'
import { getAllOrders, ordersOfCustomer, editOrder } from '../services/orderService.js'

const router = express.Router()

router.post("/checkout", async (req, res) => {
    const { customerId } = req.body
    if (!customerId || isNaN(+customerId)) return res.status(400).json({ "success": false, "message": "missing customerId" })
    const customers = await getAllCustomers()
    const customer = customers.find(c => c.customerId === +customerId)
    if (!customer) return res.status(404).json({ "success": false, "message": "customerId not found" })
    const cart = customer.cart
    if (!cart || cart.length === 0) return res.status(400).json({ "success": false, "message": "cart is empty" })
    const products = await getAllProducts()
    let total = 0
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId)
        if (!product) return res.status(400).json({ success: false, message: "product not found" })
        if (product.stock < item.quantity) return res.status(400).json({ success: false, message: "not enough stock" })
        total += product.price * item.quantity
    }
    if (customer.balance < total) return res.status(400).json({ success: false, message: "balance is not enough for this cart" })
    for (const item of cart) {
        const product = products.find(p => p.id === item.productId)
        product.stock -= item.quantity
    }
    customer.balance -= total
    const order = {
        customerId,
        items: cart,
        total
    }
    const orders = await getAllOrders()
    orders.push(order)
    customer.cart = []
    await editCustomers(customers)
    await editProducts(products)
    await editOrder(orders)
    res.status(201).json({ success: true, data: order })



})

router.get("/", async (req, res) => {
    const { customerId } = req.query
    if (!customerId || isNaN(+customerId)) return res.status(400).json({ "success": false, "message": "missing customerId" })
    const customers = await getAllCustomers()
    const customer = customers.find(c => c.customerId === +customerId)
    if (!customer) return res.status(404).json({ "success": false, "message": "customerId not found" })
    const result = await ordersOfCustomer(customerId)
    res.json({ success: true, data: result })
})

export default router
