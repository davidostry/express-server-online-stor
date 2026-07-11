import fs from 'fs/promises'
import path from 'path'

const PATH =process.env.DB_BASE_PATH

const filePath = path.join(PATH,"ordersDB.json")

export async function readOrders() {
   try { const orders = await fs.readFile(filePath, "utf-8")
    return JSON.parse(orders)
} catch(error){
    console.log(error.message);
    throw new Error("failed to read orders database")
    
}
}

export async function writeOrder(orders){
   try{ return await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8")
}catch(error){
    console.log(error.message);
    throw new Error("failed to save orders to database");
    
    
}
}