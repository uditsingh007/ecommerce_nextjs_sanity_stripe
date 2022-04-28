import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { urlFor } from "../lib/sanity";
import toast from "react-hot-toast";
import { useStateContext } from "../Context/StateContext";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const {
    totalQuantities,
    setShowCart,
    totalPrice,
    cartItems,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  const cartRef = useRef();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => {
            setShowCart(false);
          }}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, i) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt="cart product"
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <p className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() => {
                          toggleCartItemQuantity(item._id, "dec");
                        }}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num" onClick={() => {}}>
                        {item.quantity}
                      </span>
                      <span
                        className="plus"
                        onClick={() => {
                          toggleCartItemQuantity(item._id, "inc");
                        }}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                    <button
                      onClick={() => onRemove(item)}
                      type="button"
                      className="remove-item"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" onClick={handleCheckout} className="btn">
                Pay With Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
