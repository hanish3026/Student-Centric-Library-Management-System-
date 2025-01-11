import React, { useEffect, useState } from 'react';
import BookApi from '../BackendConectivity/BookApi';
import { useNavigate } from 'react-router-dom';
import '../css/LibrarianDashboard.css'; // Custom styles for the dashboard

const LibrarianDashboard = () => {
  const nav = useNavigate();
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newBook, setNewBook] = useState({
    bookId: '',
    bookName: '',
    author: '',
    status: 'Available',
  });
  const [errors, setErrors] = useState({});
  const [addBooksActive, setAddBooksActive] = useState(false);

  useEffect(() => {
    BookApi.getAllBooks()
      .then((response) => {
        if (response && response.data) {
          const flattenedBooks = response.data.flat();
          setBooks(flattenedBooks);
        }
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!newBook.bookId) validationErrors.bookId = 'Book ID is required';
    if (!newBook.bookName) validationErrors.bookName = 'Book Name is required';
    if (!newBook.author) validationErrors.author = 'Author is required';
    return validationErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      // Update existing book
      BookApi.UpdateBook(newBook.bookId, newBook)
        .then((response) => {
          const updatedBooks = books.map((book) =>
            book.bookId === newBook.bookId ? newBook : book
          );
          setBooks(updatedBooks);
          setAddBooksActive(false);
          setIsEditing(false);
        })
        .catch((error) => console.error('Error updating book:', error));
    } else {
      // Add new book
      BookApi.AddBooks(newBook)
        .then((response) => {
          setBooks((prevBooks) => [...prevBooks, newBook]);
          setAddBooksActive(false);
          setNewBook({
            bookId: '',
            bookName: '',
            author: '',
            status: 'Available',
          });
          setErrors({});
        })
        .catch((error) => console.error('Error adding book:', error));
    }
  };

  const handleAddBooks = () => {
    setNewBook({
      bookId: '',
      bookName: '',
      author: '',
      status: 'Available',
    });
    setAddBooksActive(!addBooksActive);
    setIsEditing(false);
  };

  const handleEdit = (book) => {
    setAddBooksActive(true);
    setIsEditing(true);
    setNewBook(book);
    window.scrollTo(0, 0);
  };

  const handleDelete = (bookId) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this book?')) {
      BookApi.DeleteBook(bookId)
        .then(() => {
          setBooks(books.filter((book) => book.bookId !== bookId));
        })
        .catch((error) => console.error('Error deleting book:', error));
    }
  };

  function handleLogOUT() {
    nav('/');
  }

  function handleBookIssue() {
    nav('/BookIssue');
  }

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger" onClick={handleLogOUT}>
          Log out
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className="display-4">Welcome to Librarian Dashboard</h1>
      </div>

      {/* Add/Close Book Form Button */}
      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-success"
          onClick={handleAddBooks}
          style={{ width: '200px', fontWeight: 'bold' }}
        >
          {addBooksActive ? 'CLOSE' : 'ADD BOOKS'}
        </button>
        <button
          className="btn btn-info mx-2"
          onClick={handleBookIssue}
          style={{ width: '200px', fontWeight: 'bold' }}
        >
          Issue Book
        </button>
      </div>

      {/* Form Section */}
      {addBooksActive && (
        <div className="mb-4 p-4 border rounded shadow-sm">
          <h4>{isEditing ? 'EDIT BOOK' : 'ADD NEW BOOK'}</h4>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="bookId">Book ID</label>
              <input
                type="number"
                className="form-control"
                id="bookId"
                name="bookId"
                value={newBook.bookId}
                readOnly={isEditing}
                onChange={handleInputChange}
              />
              {errors.bookId && <small className="text-danger">{errors.bookId}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="bookName">Book Name</label>
              <input
                type="text"
                className="form-control"
                id="bookName"
                name="bookName"
                value={newBook.bookName}
                onChange={handleInputChange}
              />
              {errors.bookName && <small className="text-danger">{errors.bookName}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
              />
              {errors.author && <small className="text-danger">{errors.author}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={newBook.status}
                onChange={handleInputChange}
              >
                <option value="Available">Available</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary my-3">
              {isEditing ? 'Update Book' : 'Add Book'}
            </button>
          </form>
        </div>
      )}

      {/* Table Section */}
      <div className="text-center mb-4">
        <h2>Available Books</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book.bookId}>
                  <th scope="row">{index + 1}</th>
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.status}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(book)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(book.bookId)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
