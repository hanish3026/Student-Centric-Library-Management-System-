import axios from 'axios';

const IssueApi = "http://localhost:8080/issuedBooks";
class BookIssueApi{
    IssueBooks(issue) {
        return axios.post(IssueApi,issue)
            .catch(error => console.error('Error fetching books:', error));
    }
    IssuedBooks() {
        return axios.get(IssueApi)
            .catch(error => console.error('Error fetching books:', error));
    }
    DeleteBook(id){
        return axios.delete(`${IssueApi}/${id}`)
        .catch(error => console.error('Error fetching books:', error));
    }
    GetIsseudBooksByID(id){
        return axios.get(`${IssueApi}/${id}`)
        .catch(error => console.error('Error fetching books:', error));
    }
}
const BookIssedApi = new BookIssueApi();
export default BookIssedApi