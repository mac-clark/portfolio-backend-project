Expense Tracker Web Application
===============================

Project Overview
----------------

This project is a full-stack Expense Tracker web application aimed at showcasing backend development skills, security best practices, and robust version control. Built using **Node.js**, **Express**, **MongoDB**, and **React**, it includes features for tracking expenses, visualizing spending patterns, and categorizing expenses over customizable timeframes. The application is set up to be highly modular, with a clear separation between development (`dev`) and production (`prod`) branches.

Key Features
------------

### User Authentication

-   Secure user registration and login using hashed passwords.
-   Session-based authentication for secure, persistent user sessions.
-   Login and logout functionality with session management.

### Expense Management

-   Create, update, and delete expenses with details such as **amount**, **description**, **category**, and **date**.
-   Option to retroactively add expenses by selecting custom dates.

### Categorization

-   Users can categorize expenses with predefined and custom categories.
-   Full CRUD capabilities for expense categories, allowing for organization and adaptability to user needs.

### Visualization

-   An interactive **Visualize** tab lets users view a breakdown of expenses over different timeframes, including **This Week**, **Last Week**, **Last Month**, and **Custom Date Range**.
-   **Pie chart** representation for easy visualization of spending per category.
-   Category breakdown is dynamically color-coded to match pie chart segments, providing a cohesive visual experience.

### Kanban Board for Development Tracking

-   Integrated Kanban board used throughout development to manage tasks and document feature progress.
-   Tasks such as version control, component creation, and API integration are displayed for clarity.

Planned Enhancements
--------------------

### Landing Page for Showcase

-   A landing page on the domain `clarkcodes.dev` will provide an overview of the project, including development process insights, Kanban board snapshots, and repository links.
-   Clear descriptions of the project architecture, features, and technologies used.

### Cloud Deployment

-   Deployment on AWS using free-tier services where possible.
-   Integration of additional cloud services for enhanced performance, scalability, and security.

Project Structure
-----------------

```graphql

portfolio-project/
├── frontend/                    # Directory containing all frontend code
│   ├── public/
│   │   └── index.html           # Main HTML file for the React app
│   ├── src/                     # Source directory for React components and styling
│   │   ├── components/          # Contains individual React component files
│   │   │   ├── Dashboard.js     # Dashboard component where users can navigate through the app
│   │   │   ├── Expenses.js      # Component for adding, viewing, and deleting expenses
│   │   │   ├── Categorize.js    # Component for managing categories of expenses
│   │   │   ├── Visualize.js     # Component to visualize expense data with charts
│   │   │   └── LandingPage.js   # Landing page component with login/register options
│   │   ├── styles/              # Contains individual CSS files for components
│   │   │   ├── dashboard.css    # Styling for the Dashboard component
│   │   │   ├── expenses.css     # Styling for the Expenses component
│   │   │   ├── categorize.css   # Styling for the Categorize component
│   │   │   └── visualize.css    # Styling for the Visualize component
│   │   ├── App.js               # Main React App component, sets up routing
│   │   └── index.js             # Entry point for React app
│   ├── package.json             # Manages dependencies and scripts for the frontend
│   └── README.md                # Documentation specific to the frontend (optional)
├── config/                      # Configuration files
│   └── session.js               # Session configuration for user authentication
│   └── db.js                    # Database configuration
├── controllers/                 # Contains logic for handling API requests
│   ├── authController.js        # Controller for authentication logic (login, register)
│   ├── expenseController.js     # Controller for expense-related operations
│   └── categoryController.js    # Controller for managing categories
├── middleware/                  # Middleware functions
│   └── authMiddleware.js        # Middleware to ensure user authentication on routes
├── models/                      # Database models
│   ├── User.js                  # Mongoose schema and model for user data
│   ├── Expense.js               # Mongoose schema and model for expenses
│   └── Category.js              # Mongoose schema and model for categories
├── routes/                      # API routes
│   ├── authRoutes.js            # Routes for authentication (login, register, logout)
│   ├── expenseRoutes.js         # Routes for creating, reading, and deleting expenses
│   └── categoryRoutes.js        # Routes for managing categories
├── .env                         # Environment variables file, for sensitive data
├── .gitignore                   # Specifies files and directories for Git to ignore
├── LICENSE                      # MIT License file for the project
├── README.md                    # Main documentation for the project
├── package.json                 # Manages dependencies and scripts for the backend
└── server.js                    # Entry point for the backend server
```

Installation & Setup
--------------------

1.  **Clone the Repository**

    ```bash

    git clone <repository-url>

2.  **Install Backend Dependencies**

    ```bash

    npm install

3.  **Install Frontend Dependencies**

    ```bash

    cd frontend
    npm install

4.  **Environment Variables**

    -   Set up `.env` files in the `portfolio-project` directory:

        ```makefile

        PORT=<your-preferred-port>
        MONGO_URI=<your-mongodb-connection-string>
        SESSION_SECRET=<your-session-secret>

5.  **Running the Application**

    -   In the `project-root` folder, start the server:

        ```bash

        npm start

    -   In the `frontend` folder, start the React app:

        ```bash

        npm start

Usage
-----

-   **Register and Login**: Start by registering a new user account and logging in.
-   **Dashboard**: The dashboard is the main interface for tracking expenses. You can:
    -   **Add New Expenses**: Enter details like amount, description, category, and date.
    -   **Categorize Expenses**: Organize and manage categories for better tracking.
    -   **Visualize**: Select a date range to visualize your spending, see the expense breakdown, and view a pie chart of expenses.

Versioning & Branch Structure
-----------------------------

This project follows a versioned branch structure:

-   **`dev` Branch**: Contains the latest development features and updates.
-   **`prod` Branch**: Stable branch for production-ready code.
-   **GitHub Actions** may be configured for automated testing and deployment in the future.

Contributing
------------

If you're interested in contributing to this project:

1.  Fork the repository.
2.  Create a new feature branch (`feature/your-feature-name`).
3.  Commit your changes.
4.  Create a pull request against the `dev` branch.

License
-------

This project is licensed under the MIT License.