import React, { useContext } from "react";
import empty from "../../assets/images/empty-fav.svg";
import { ThumbDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import "../../Styles/favorites.css";
import CategoryProductCard from "../../Components/CategoryProductCard";
function Favorites() {
  const { favoritesState } = useContext(DataContext);
  // const categoryName = cartState.map((item) => categories[item.category])
  return (
    <section className="favorites-page-wrapper">
      <div className="favorites-container">
        <h1 className="favorites-title">My Favorites</h1>
        {favoritesState?.length < 1 && (
          <article className="favorites-empty-container">
            <h2 className="empty-title">
              Uh Oh! <ThumbDown fontSize="large" />
            </h2>
            <p className="fav-parag">
              No products added yet! All the products you like will appear here!
            </p>
            <img src={empty} alt="Empty illustration" className="empty-img" />
            <Link className="fav-link" to="/">
              Continue Shopping
            </Link>
          </article>
        )}

        {favoritesState.length >= 1 && (
          <article className="favorites-filled-container">
            <CategoryProductCard categoryData={favoritesState} />
          </article>
        )}
      </div>
    </section>
  );
}

export default Favorites;
