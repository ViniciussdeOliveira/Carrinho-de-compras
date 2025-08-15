let products = [
    { name: "Booster Pack Pokemon", price: 10.99, stock: 5 },
    { name: "Booster Pack YuGiOh", price: 13.50, stock: 10 },
    { name: "Booster Pack One Piece", price: 20.89, stock: 3 }
];

function listProducts() {
    console.log("\nProdutos disponíveis:");
    products.forEach((p, index) => {
        console.log(`${index + 1}. ${p.name} - R$ ${p.price} | Estoque: ${p.stock}`);
    });
}

function addProduct(name, price, stock) {
    products.push({ name, price: Number(price), stock: Number(stock) });
}

function getProductByIndex(index) {
    return products[index];
}

function updateStock(productName, quantity) {
    const product = products.find(p => p.name === productName);
    if (product) {
        product.stock -= quantity;
    }
}

export { listProducts, addProduct, getProductByIndex, updateStock };
