import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

export default function HomePage() {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p>${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
