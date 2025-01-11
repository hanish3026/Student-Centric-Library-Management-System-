# Project Title
STUDENT-CENTRIC-LMS
## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **[Node.js](https://nodejs.org/en/)** (version 14.x or higher)
- **[npm](https://www.npmjs.com/)** (npm comes with Node.js)

To check if Node.js and npm are installed, run the following commands in your terminal:

```bash
node -v
npm -v

Steps
git clone <repository-url>
cd <project-folder>
npm install
npm start


-------------------------------------------------------Spring Boot Backend Setup Guide----------------------------------------------

Prerequisites
Before you begin, ensure that you have the following tools installed:
Spring Tool Suite (STS) or Eclipse with the Spring Plugin.
Download STS from Spring's official site.
Java Development Kit (JDK):
You need JDK 8 or higher. You can download it from Oracle or install through OpenJDK.
Maven (if not included with STS):
Maven is used for managing dependencies and building the project. You can download Maven from Apache Maven.
MySQL Database:
Ensure you have MySQL installed and running locally, or use an external database server. 

---------------------------------Import the Spring Boot Project-----------------------------------

To get started with your Spring Boot project, follow these steps:
Download the ZIP file containing the Spring Boot project.
Extract the ZIP file to your local machine.
Import the Project into STS:
Open Spring Tool Suite (STS) or Eclipse.
Go to File > Import > Existing Maven Projects.
Browse to the extracted folder and select the project directory.
Click Finish to import the project.
2. Configure application.properties
You need to configure the database connection and other project-specific properties in the application.properties file. Follow these steps:
Locate the application.properties file:
In the project folder, navigate to src/main/resources/application.properties.
Modify the properties:
Open application.properties in a text editor or within STS.
Add or modify the following properties based on your project’s requirements:


---------------------------------------------------------application.properties------------------------------------------------

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_database_username
spring.datasource.password=your_database_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration (Optional)
server.port=8080
