# WebsiteFrontend

<https://adamhilty.com>

Frontend repository for my personal portfolio. This application showcases my software engineering projects, work experience, and education at The Ohio State University. It fetches this data through a custom C# backend.

## About

### Tech Stack

* **Framework:** Angular (Standalone Components)
* **Language:** TypeScript
* **Styling:** HTML5 & SCSS
* **Hosting/Deployment:** AWS Amplify
* **Backend Integration:** Communicates with a C# / .NET API hosted on AWS Elastic Beanstalk.

### Key Features

* **Dynamic Portfolio:** Data-driven sections for Projects, Work Experience, Education, and Notable Coursework.
* **Optimized Performance:** Utilizes Angular Pure Pipes for highly efficient DOM rendering and fragment routing.
* **Responsive Design:** Built with CSS Flexbox to ensure a seamless experience across desktop and mobile devices.

## Local Setup

To run this Angular frontend locally on your machine, follow these steps:

### Prerequisites

* Node.js installed
* Angular CLI installed globally
* *Optional but recommended:* The companion [C# backend repository](https://github.com/robbobthecorncob1/ProfileCore) cloned and running locally.

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/robbobthecorncob1/WebsiteFrontend
cd WebsiteFrontend
npm install
```

### 2. Configure Environment Variables

This project uses Angular environments to switch between local development and production API URLs. Ensure your src/environments/environment.development.ts file is configured to point to your local C# backend (default is 5126):

```bash
export const environment = {
  apiUrl: 'http://localhost:5126/api/gpa'
};
```

### 3. Start the Development Server

```bash
ng server
```

Navigate to <http://localhost:4200/> in your browser. The application will automatically reload if you change any of the source files.

## Deployment

This frontend is continuously deployed using AWS Amplify.

When code is pushed to the main branch, Amplify automatically triggers a build using the src/environments/environment.ts file, which points to the live production C# API: <https://api.adamhilty.com/api/gpa>

## Author

Adam Hilty

B.S. Computer Science and Engineering  
The Ohio State University (May 2026)
