import React, { useEffect, useState } from "react";
import '../css/LandingPage.css';
import { Assets } from "../assets/Assests";
import LoginApi from "../BackendConectivity/LoginBackend";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const nav = useNavigate();
  const [activeButton, setActiveButton] = useState("Student");
  const [validateData, setValidateData] = useState(null);
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [validationMessage, setValidationMessage] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  const handleActiveStudent = () => {
    setActiveButton("Student");
  };

  const handleActiveLibrarian = () => {
    setActiveButton("Librarian");
  };

  useEffect(() => {
    if (activeButton === "Student") {
      LoginApi.getAllDetails()
        .then((data) => {
          if (data) {
            setValidateData(data.data);
          } else {
            console.log("No data returned");
          }
        })
        .catch((error) => {
          console.error("There was an error during submit!", error);
        });
    } else {
      LoginApi.getLibrarianDetails()
        .then((data) => {
          if (data) {
            setValidateData(data.data[0]);
          } else {
            console.log("No data returned");
          }
        })
        .catch((error) => {
          console.error("There was an error during submit!", error);
        });
    }

    window.history.pushState(null, document.title);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, document.title);
    });

    return () => {
      window.removeEventListener("popstate", () => { });
    };
  }, [activeButton]);
console.log(validateData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationMessage("");
    if (!formData.id || !formData.password) {
      setValidationMessage("Please fill out both fields.");
      return;
    }

    if (activeButton === "Student") {
      // Assuming `formData` contains the data entered by the user in the form
      const studentId = parseInt(formData.id);  // Get the studentId from formData
      const student = validateData.find(student => student.studentId === studentId);

      // Validate if the student exists and if the password matches
      if (student && formData.password === student.password) {
          nav(`/StudentDashboard/${studentId}`);  // Redirect to Student Dashboard
      } else {
          setValidationMessage("Invalid credentials for Student");
      }
  } else if (activeButton === "Librarian") {
    const librarianId = parseInt(formData.id); // Assuming formData contains the librarian ID
    // Check if validateData contains a librarian object
    const librarian = validateData.librarianId === librarianId;

    if (librarian && formData.password === validateData.password) {
        nav("/LibrianDashboard");  // Redirect to Librarian Dashboard
    } else {
        setValidationMessage("Invalid credentials for Librarian");
    }
}
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="row w-100">
        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <img
            src={Assets.LandingImg}
            alt="Group Illustration"
            className="img-fluid images"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
        <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
          <div className="box w-75 rounded p-4 transition-all">
            <div className="button-container d-flex mb-4">
              <button
                className={`merged-button-left ${activeButton === "Student" ? "merged-button-left-active" : ""} flex-grow-1`}
                onClick={handleActiveStudent}
              >
                Student
              </button>
              <button
                className={`merged-button-right ${activeButton === "Librarian" ? "merged-button-left-active" : ""} flex-grow-1`}
                onClick={handleActiveLibrarian}
              >
                Librarian
              </button>
            </div>
            <h2 className="text-center py-3">{activeButton} Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y pe-3"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>

              {validationMessage && <small className="text-danger">{validationMessage}</small>}
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
