// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const books = useSelector((state) => state.books);
  const categories = ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Mystery"];

  // Determine popular books (e.g., top-rated)
  const popularBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Online Library</h1>

      <section className="home-section">
        <h2 className="home-section-title">Book Categories</h2>
        <div className="home-categories">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/books/${category}`}
              className="home-category-link"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Popular Books</h2>
        <ul className="home-popular-books-list">
          {popularBooks.map((book) => (
            <li key={book.id} className="home-popular-book-item">
              <img
                src={book.image}
                alt={book.title}
                className="home-popular-book-image"
                height="250px"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/placeholder.jpg"; // Path to your placeholder image
                }}
              />
              <div className="home-popular-book-info">
                <h3 className="home-popular-book-title">{book.title}</h3>
                <p className="home-popular-book-author">by {book.author}</p>
                <Link
                  to={`/books/details/${book.id}`}
                  className="home-popular-book-link"
                >
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
