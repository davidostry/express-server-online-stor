import express from 'express'
import { getAllProducts } from '../services/productServer.js'

const router = express.Router()


router.get("/", async (req, res) => {
    const products = await getAllProducts()
    let result = products
    const { inStock, maxPrice, search } = req.query
    if (inStock == "true") result = result.filter(p => p.stock > 0)
    if (maxPrice && !isNaN(+maxPrice)) result = result.filter(p => p.price <= +req.query.maxPrice)
    if (search) result = result.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()))
    if (inStock && inStock !== "true") return res.status(400).end("inStock not true")
    if (result.length == products.length && req.url.includes("?")) return res.status(400).end("invalid query")
    res.json({ success: true, data: result })
})


export default router