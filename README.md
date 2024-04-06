# TMUClassifieds

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/tmufinds-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">TMU Classifieds</h3>

  <p align="center">
    Welcome to TMU Finds, the one-stop shop for students at Toronto Metropolitan University.
    <br />
    <br />
    <a href="https://tmu-classifieds.vercel.app/"><strong>View the website</strong></a>
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![TMU Finds][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

### Built With

This project was built using the following frameworks and libraries:

* [![React][React.js]][React-url]
* [![Flask][Flask]][Flask-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Material UI][MaterialUI]][MaterialUI-url]
* [![Firebase][Firebase]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow the following steps to run the project locally on your machine.

### Prerequisites

You will need the following installed in order to run the project locally:
* Python
  
  [Download Python](https://www.python.org/downloads/)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Make sure you have the repo downloaded on your machine.

#### Installing the Backend
1. Navigate to the backend directory from the project root directory
    ```
    cd ./server
    ```
2. Install the requirements
    ```
    pip install -r requirements.txt
    ```
3. Navigate to the api directory from the project root directory
    ```
    cd ./server/api
    ```
4. Open the routes.py file and navigate to line 13 of the code, replace the import statement with the following
    ```
    from helpers import verify_id_token
    ```
5. Run the Flask app
    ```
    flask --app routes --debug run
    ```

#### Installing the Frontend
1. Navigate to the frontend directory from the project root directory
    ```
    cd ./client
    ```
2. Install NPM packages
    ```
    npm install
    ```
3. Run the React app
    ```
    npm start
    ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[MaterialUI]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[MaterialUI-url]: https://mui.com/material-ui/
[Firebase]: https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[product-screenshot]: images/tmufinds-screenshot.png
