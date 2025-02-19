import { useMemo, useState } from "react";

const ProductList = () => {
  const [minPrice, setMinPrice] = useState(30);
  const [product] = useState([
    { id: 1, name: "Laptop A", price: 10 },
    { id: 2, name: "Laptop B", price: 20 },
    { id: 3, name: "Laptop C", price: 40 },
    { id: 4, name: "Laptop D", price: 60 },
  ]);
  const filterProduct = useMemo(() => {
    console.log("filter our product");
    return product.filter((product) => product.price >= minPrice);
  }, [product, minPrice]);
  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value as unknown as number);
  };
  return (
    <div>
      <input type="number" value={minPrice} onChange={handler} />
      <ul>
        {filterProduct.map((product) => {
          return (
            <li key={product.id}>
              {product.name}:{product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ProductList;
