import axios from 'axios';

const StudentApi = "http://localhost:8080/StudentLogin"
const LibrarianApi = "http://localhost:8080/LibrarianLogin"

class LoginBackend {
    getAllDetails() {
        return axios.get(StudentApi)
            .catch(error => console.log(error))
    }
    getLibrarianDetails() {
        return axios.get(LibrarianApi)
        .catch(error => console.log(error))
    }
}


const LoginApi = new LoginBackend();
export default LoginApi;