import fs from 'fs/promises'
import path from 'path'

const PATH = process.env.DB_BASE_PATH

const filePath = path.join(PATH, "customerDB.json")

export async function readCustomer() {
    try {
        const customers = await fs.readFile(filePath, "utf-8")
        return JSON.parse(customers)
    }catch(error){
        console.log(error.massage);
        throw new Error("failed to read customers to database");
        
        
    }
} 

export async function writeCustomer(customer) {
    try {
    return await fs.writeFile(filePath, JSON.stringify(customer, null, 2), "utf-8")
}catch(error){
console.log(error.massage);
throw new Error("failed to save customers")


}
}