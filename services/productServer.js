import { readProducts, writeProduct } from '../repositories/productsRepo.js'

export async function getAllProducts() {
    return await readProducts()
}

export async function editProducts(products) {
    return await writeProduct(products)
}