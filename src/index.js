import createItem from "./services/item.js";
import * as cartService from "./services/cart.js";
import { listProducts, addProduct, getProductByIndex, updateStock } from "./services/productList.js";
import { ask, closePrompt } from "./utils/prompt.js";

const cart = [];

async function mainMenu() {
    let running = true;

    while (running) {
        console.log(`
            ===== MENU =====
            1. Listar produtos
            2. Adicionar produto ao estoque
            3. Adicionar produto ao carrinho
            4. Ver carrinho
            5. Finalizar compra
            6. Remover quantidade de um item do carrinho
            7. Deletar item do carrinho
            0. Sair
        `);

        const option = await ask("Escolha uma opção: ");

        switch (option) {
            case "1":
                listProducts();
                break;

            case "2":
                const name = await ask("Nome do produto: ");
                const price = await ask("Preço: ");
                const stock = await ask("Quantidade em estoque: ");
                addProduct(name, price, stock);
                console.log("Produto adicionado com sucesso!");
                break;

            case "3":
                listProducts();
                const prodIndex = Number(await ask("Digite o número do produto: ")) - 1;
                const quantity = Number(await ask("Quantidade: "));
                const selected = getProductByIndex(prodIndex);

                if (!selected) {
                    console.log("Produto inválido!");
                    break;
                }

                if (selected.stock < quantity) {
                    console.log(`Estoque insuficiente! Apenas ${selected.stock} disponíveis.`);
                    break;
                }

                const item = await createItem(selected.name, selected.price, quantity);
                await cartService.addItem(cart, item);
                console.log("Produto adicionado ao carrinho!");
                break;

            case "4":
                await cartService.displayCart(cart);
                await cartService.calculateTotal(cart);
                break;

            case "5":
                if (cart.length === 0) {
                    console.log("Carrinho vazio!");
                    break;
                }
                cart.forEach(c => updateStock(c.name, c.quantity));
                cart.length = 0;
                console.log("Compra finalizada com sucesso!");
                break;

            case "6":
                await cartService.displayCart(cart);
                const itemNameRemove = await ask("Nome do item para remover: ");
                const qtyRemove = Number(await ask("Quantidade a remover: "));
                const itemFound = cart.find(i => i.name === itemNameRemove);

                if (!itemFound) {
                    console.log("Item não encontrado no carrinho!");
                    break;
                }

                if (qtyRemove >= itemFound.quantity) {
                    await cartService.deleteItem(cart, itemNameRemove);
                    console.log("Item removido completamente do carrinho.");
                } else {
                    itemFound.quantity -= qtyRemove;
                    console.log(`Removidas ${qtyRemove} unidades de ${itemNameRemove}.`);
                }
                break;

            case "7":
                await cartService.displayCart(cart);
                const itemNameDelete = await ask("Nome do item para deletar: ");
                await cartService.deleteItem(cart, itemNameDelete);
                console.log("Item removido do carrinho.");
                break;

            case "0":
                running = false;
                console.log("Saindo...");
                break;

            default:
                console.log("Opção inválida!");
        }
    }

    closePrompt();
}

console.log("Bem-vindo ao seu Carrinho de Compras!");
await mainMenu();
