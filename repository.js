import fs from 'fs/promises'

async function readFile(path){
    const data = fs.readFile(path, "utf-8")
}