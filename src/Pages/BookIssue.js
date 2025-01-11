import React, { useState, useEffect } from "react";
import BookApi from "../BackendConectivity/BookApi";
import LoginApi from "../BackendConectivity/LoginBackend";
import BookIssedApi from "../BackendConectivity/BookIssueApi";

const BookIssue = () => {
    const [formData, setFormData] = useState({
        studenID: "",
        bookID: "",
        bookName: "",
        issueDate: "",
        returnDate: "",
        fineAmount: 0, // Default value set to 0
    });
    const [books, setBooks] = useState([]);
    const [Issuedbooks, setIssuedBooks] = useState([]);
    const [studentID, SetstudentID] = useState([]);

    useEffect(() => {
        // Fetch all books
        BookApi.getAllBooks()
            .then((response) => {
                if (response && response.data) {
                    const flattenedBooks = response.data.flat();
                    setBooks(flattenedBooks);
                }
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });

        // Fetch all student details
        LoginApi.getAllDetails()
            .then((response) => {
                if (response && response.data) {
                    SetstudentID(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching student details:", error);
            });

        // Fetch issued books
        BookIssedApi.IssuedBooks()
            .then((response) => {
                if (response && response.data) {
                    setIssuedBooks(response.data);
                }
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        BookIssedApi.IssueBooks(formData)
            .then((response) => {
                if (response.data) {
                    setFormData({
                        studenID: "",
                        bookID: "",
                        bookName: "",
                        issueDate: "",
                        returnDate: "",
                        fineAmount: 0, // Default value set to 0
                    });
                    window.location.reload();
                }
            });
    };

    function handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this book?')) {
            BookIssedApi.DeleteBook(id)
                .then(() => {
                    setIssuedBooks(Issuedbooks.filter(book => book.id !== id));
                })
                .catch(error => console.error('Error deleting book:', error));
        }
    }
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1>Book Issuing Page</h1>
            </div>
            <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
                <div className="row">
                    {/* Student Dropdown */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="studentID" className="form-label">
                            Select Student
                        </label>
                        <select
                            className="form-select"
                            name="studenID"
                            value={formData.studenID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Student</option>
                            {studentID.map((student) => (
                                <option key={student.studentId} value={student.studentId}>
                                    {student.studentId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Book ID Dropdown */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="bookID" className="form-label">
                            Select Book ID
                        </label>
                        <select
                            className="form-select"
                            name="bookID"
                            value={formData.bookID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Book ID</option>
                            {books.map((book) => (
                                <option key={book.bookId} value={book.bookId}>
                                    {book.bookId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Book Name Dropdown */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="bookName" className="form-label">
                            Select Book Name
                        </label>
                        <select
                            className="form-select"
                            name="bookName"
                            value={formData.bookName}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a Book Name</option>
                            {books.map((book) => (
                                <option key={book.bookName} value={book.bookName}>
                                    {book.bookName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Issue Date */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="issueDate" className="form-label">
                            Issue Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Return Date */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="returnDate" className="form-label">
                            Return Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Fine Amount */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="fineAmount" className="form-label">
                            Fine Amount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="fineAmount"
                            value={formData.fineAmount}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary px-4 py-2">Issue Book</button>
                    </div>
                </div>
            </form>

            {/* Issued Books Table */}
            <div className="mt-5">
                <h2 className="text-center mb-4">Issued Books</h2>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th>Fine Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Issuedbooks.map((book) => (
                            <tr key={book.studenID}>
                                <td>{book.studenID}</td>
                                <td>{book.bookID}</td>
                                <td>{book.bookName}</td>
                                <td>{book.issueDate}</td>
                                <td>{book.returnDate}</td>
                                <td>{book.fineAmount}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(book.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookIssue;
