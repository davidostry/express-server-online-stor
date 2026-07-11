import fs from 'fs/promises'
import path from 'path'

const PATH =process.env.DB_BASE_PATH

const filePath = path.join(PATH,"ordersDB.json")

export async function readOrders() {
    const orders = await fs.readFile(filePath, "utf-8")
    return JSON.parse(orders)
}

export async function writeOrder(orders){
    return await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8")
}