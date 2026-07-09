import fs from 'fs/promises'

const filePath = "../databases/productDB.json"

export async function readProducts() {
    const products = await fs.readFile(filePath, "utf-8")
    return JSON.parse(products)
}

export async function writeCustomer(customer){
    const customers = await fs.writeFile(filePath, JSON.stringify(customer, null, 2), "utf-8")
}

