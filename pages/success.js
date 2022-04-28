import React, { useEffect } from "react";
import Link from "next/link";
import { useStateContext } from "../Context/StateContext";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "../lib/confetti";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your Order</h2>
        <p className="email-msg">Check you email for reciept</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@test.com">
            order@test.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
