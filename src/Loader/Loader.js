import { shoppingCartItem } from "../utilities/fakedb";

export const productAndCartLoader = async () => {
    const productData = await fetch('products.json');
    const products = await productData.json();
    const savedCart = shoppingCartItem();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct)
        }

    }
    return { products, initialCart };
}