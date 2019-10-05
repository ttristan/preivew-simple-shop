import React, { useState, useEffect } from "react";
import "./Shop.scss";
import tablet from "../img/tablet.png";
import laptop from "../img/laptop.png";
import phone from "../img/phone.png";

const App: React.FC = () => {
  const [cartSumCent, setCartSumCent] = useState<number>(0);
  const [cartSumString, setCartSumString] = useState<string>("0,00");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const priceString = getPriceString(cartSumCent);

    setCartSumString(priceString);
  }, [cartSumCent]);

  const addToCart = (priceCent: number) => {
    setCartSumCent(cartSumCent + priceCent);
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <div className="Shop">
      <nav>
        <header>Shop</header>
        <button className="cart">
          <span role="img" aria-label="cart">
            🛒
          </span>
          Cart ({cartItemCount}) {cartSumString}
        </button>
      </nav>
      <div className="items">
        <Item
          name="Laptop"
          priceCent={129900}
          addToCart={addToCart}
          img={laptop}
        />
        <Item
          name="Phone"
          priceCent={69999}
          addToCart={addToCart}
          img={phone}
        />
        <Item
          name="Tablet"
          priceCent={79995}
          addToCart={addToCart}
          img={tablet}
        />
      </div>
    </div>
  );
};

export default App;

interface ItemProps {
  name: string;
  priceCent: number;
  img: string;
  addToCart: (price: number) => void;
}
const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const addToCart = () => props.addToCart(props.priceCent);
  const priceString = getPriceString(props.priceCent);
  return (
    <div className="item">
      <div className="imageContainer">
        <img src={props.img} alt={props.name}></img>
      </div>
      <h4>{props.name}</h4>
      <div className="options">
        <span>{priceString}</span>
        <div className="buttonGroup">
          <button>Details</button>
          <button onClick={addToCart}>
            Buy{" "}
            <span role="img" aria-label="buy">
              🛒
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * append zeros
 * turns 9910 cents into $99,10
 */
const getPriceString = (priceCent: number) => {
  const localeSumString = String(priceCent / 100);
  const left = localeSumString.split(".")[0];

  const right = (localeSumString.split(",")[1] || "").padEnd(2, "0");
  const priceString = [left, right].join(".");
  return "$" + priceString;
};
