import React, { useEffect, useState } from 'react';
import BookApi from '../BackendConectivity/BookApi';
import { useParams } from 'react-router-dom';
import BookIssedApi from '../BackendConectivity/BookIssueApi';
import '../css/StudentDashboard.css';  // Assuming you will add custom CSS here

const StudentDashboard = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [borrow, setBorrow] = useState(false);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch all books from the API
        BookApi.getAllBooks()
            .then(response => {
                if (response && response.data) {
                    const flattenedBooks = response.data.flat();
                    setBooks(flattenedBooks);
                }
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });

        if (id) {
            const studentId = parseInt(id);
            setBorrow(true);
            BookIssedApi.GetIsseudBooksByID(studentId)
                .then(data => {
                    setBorrowedBooks(data.data);
                });
        }
    }, [id]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredBooks = books.filter((book) =>
        book.bookName.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-5">
            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="display-4">Welcome to Student Dashboard</h1>
            </div>

            {borrow && (
                <div>
                    <h2 className="text-center mb-4">Issued Books</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Student ID</th>
                                    <th>Book ID</th>
                                    <th>Book Name</th>
                                    <th>Issue Date</th>
                                    <th>Return Date</th>
                                    <th>Fine Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowedBooks.map((book) => (
                                    <tr key={book.studenID}>
                                        <td>{book.studenID}</td>
                                        <td>{book.bookID}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.issueDate}</td>
                                        <td>{book.returnDate}</td>
                                        <td className={book.fineAmount > 0 ? "text-danger" : ""}>
                                            {book.fineAmount}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Search and Available Books Section */}
            <div className="mt-5">
                <h2 className="text-center mb-4">Available Books</h2>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search books..."
                        onChange={handleSearch}
                    />
                    <div className="input-group-append mx-2">
                        <span className="input-group-text">🔍</span>
                    </div>
                </div>

                {/* Available Books Table */}
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr key={book.bookId}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{book.bookId}</td>
                                        <td>{book.bookName}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            {book.status === 'Checked Out' ? (
                                                <span className="badge badge-danger">Not Available</span>
                                            ) : (
                                                <span className="badge badge-success">Available</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No books available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
