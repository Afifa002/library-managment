import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/booksSlice";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    rating: "",
    image: null, // Added field for the book image
  });
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      !book.title ||
      !book.author ||
      !book.category ||
      !book.description ||
      !book.rating ||
      !book.image
    ) {
      alert("Please fill out all fields and add an image.");
      return;
    }

    // Create FormData for image upload (if uploading to backend with image support)
    const bookData = { ...book, rating: parseFloat(book.rating) };
    dispatch(addBook(bookData));
    navigate("/books");
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBook({ ...book, image: file });

      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add a New Book</h2>
      <div style={styles.field}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          required
          style={styles.textarea}
        ></textarea>
      </div>
      <div style={styles.field}>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g., 4.5)"
          value={book.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          required
          style={styles.input}
        />
      </div>
      <div style={styles.field}>
        <label>Book Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={styles.input}
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div style={styles.imagePreviewContainer}>
          <img
            src={imagePreview}
            alt="Book Preview"
            style={styles.imagePreview}
          />
        </div>
      )}

      <button type="submit" style={styles.button}>
        Add Book
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "black",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  imagePreviewContainer: {
    marginBottom: "15px",
    textAlign: "center",
  },
  imagePreview: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default AddBook;
