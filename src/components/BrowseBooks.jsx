import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./BrowseBooks.module.css"; // Correct CSS Modules import

const BrowseBooks = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const books = useSelector((state) => state.books);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      !category || book.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles['browse-books-container']}>
      <h1 className={styles['browse-books-title']}>
        Browse Books {category ? `in ${category}` : ""}
      </h1>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles['browse-books-search']}
      />
      <ul className={styles['browse-books-list']}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id} className={styles['browse-books-item']}>
              <img
                src={book.image}
                alt={book.title}
                className={styles['browse-books-image']}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "/assets/images/placeholder.jpg"; // Path to your placeholder image
                }}
              />
              <div className={styles['browse-books-info']}>
                <strong>{book.title}</strong> by {book.author}
              </div>
              <Link to={`/books/details/${book.id}`} className={styles['browse-books-link']}>
                View Details
              </Link>
            </li>
          ))
        ) : (
          <li className={styles['browse-books-no-books']}>No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default BrowseBooks;
