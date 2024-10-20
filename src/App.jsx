// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import BrowseBooks from "./components/BrowseBooks";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <Link to="/">Home</Link>
          </li>
          <li style={styles.li}>
            <Link to="/books">Browse Books</Link>
          </li>
          <li style={styles.li}>
            <Link to="/add-book">Add Book</Link>
          </li>
        </ul>
      </nav>
      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BrowseBooks />} />
          <Route path="/books/:category" element={<BrowseBooks />} />
          <Route path="/books/details/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  nav: {
    backgroundColor: "#f8f8f8",
    padding: "10px",
  },
  ul: {
    listStyleType: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  li: {
    display: "inline",
  },
  container: {
    padding: "20px",
  },
};

export default App;
