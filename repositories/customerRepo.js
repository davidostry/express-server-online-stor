import fs from 'fs/promises'
import path from 'path'

const PATH =process.env.DB_BASE_PATH

const filePath = path.join(PATH,"customerDB.json")

export async function readCustomer() {
    const customers = await fs.readFile(filePath, "utf-8")
    return JSON.parse(customers)
}

export async function writeCustomer(customer){
    return await fs.writeFile(filePath, JSON.stringify(customer, null, 2), "utf-8")
}