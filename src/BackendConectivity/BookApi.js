import axios from 'axios';

const BookApis = "http://localhost:8080/Books";
const AddBookApis = "http://localhost:8080/Books"
const UpdateApi = "http://localhost:8080/Books"
class BookApiService {
    getAllBooks() {
        return axios.get(BookApis)
            .catch(error => console.error('Error fetching books:', error));
    }
    AddBooks(books) {
        return axios.post(AddBookApis,books)
            .catch(error => console.error('Error fetching books:', error));
    }
    UpdateBook(id,books){
        return axios.put(`${UpdateApi}/${id}`,books)
        .catch(error => console.error('Error fetching books:', error));
    }
    DeleteBook(id){
        return axios.delete(`${UpdateApi}/${id}`)
        .catch(error => console.error('Error fetching books:', error));
    }
}

const BookApi = new BookApiService();
export default BookApi;
