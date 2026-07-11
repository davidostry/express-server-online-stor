import fs from 'fs/promises'
import path from 'path'

const PATH = process.env.DB_BASE_PATH

const filePath = path.join(PATH, "productDB.json")

export async function readProducts() {
    try {
        const products = await fs.readFile(filePath, "utf-8")
        return JSON.parse(products)
    }catch(error){
        console.log(error.message);
        throw new Error("failed to read products database");
        
        
    }
}

export async function writeProduct(product) {
   try{ return await fs.writeFile(filePath, JSON.stringify(product, null, 2), "utf-8")
}catch(error){
    console.log(error.message);
    throw new Error("failed to save products to database");
    
    
}
}

