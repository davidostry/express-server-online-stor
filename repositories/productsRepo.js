import fs from 'fs/promises'
import path from 'path'

const PATH =process.env.DB_BASE_PATH

const filePath = path.join(PATH,"productDB.json")

export async function readProducts() {
    const products = await fs.readFile(filePath, "utf-8")
    return JSON.parse(products)
}

export async function writeProduct(product){
    return await fs.writeFile(filePath, JSON.stringify(product, null, 2), "utf-8")
}

