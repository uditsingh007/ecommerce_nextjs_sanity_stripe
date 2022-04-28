import React from "react";
import { Product, HeroBanner, FooterBanner } from "../components";
import { client } from "../lib/sanity";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((prod) => (
          <Product key={prod._id} product={prod} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuerry = '*[_type == "product"]';
  const products = await client.fetch(productQuerry);

  const bannerQuerry = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuerry);

  return {
    props: { products, bannerData },
  };
};

export default Home;
