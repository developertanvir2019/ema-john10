import { shoppingCartItem } from "../utilities/fakedb";

export const productAndCartLoader = async () => {
    const productData = await fetch('http://localhost:5000/products');
    const { products } = await productData.json();
    const savedCart = shoppingCartItem();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct)
        }

    }
    return { products, initialCart };
}