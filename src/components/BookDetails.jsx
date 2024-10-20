// src/components/BookDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./BookDetails.module.css"; // Using CSS Modules

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const books = useSelector((state) => state.books);
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return (
      <div className={styles.container}>
        <h2>Book Not Found</h2>
        <button onClick={() => navigate(-1)} className={styles.button}>
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <img
        src={book.image}
        alt={book.title}
        className={styles.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/assets/images/placeholder.jpg"; // Path to your placeholder image
        }}
      />
      <h1>{book.title}</h1>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Category:</strong> {book.category}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Rating:</strong> {book.rating} / 5
      </p>
      <button onClick={() => navigate(-1)} className={styles.button}>
        Back to Browse
      </button>
    </div>
  );
};

export default BookDetails;
