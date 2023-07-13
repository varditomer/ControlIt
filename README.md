# ControlIt - Client Side

ControlIt is a web application built using Vue, TypeScript, Vuetify, and Pinia.  
It provides a user-friendly interface for controlling accounts of partners.  
This README focuses on the client-side implementation of ControlIt.
while the server-side implementation details can be found in the 

## Usage
Before running the ControlIt application, make sure you have the server application running. Refer to the [ControlIt Server-Side README](https://github.com/varditomer/ControlIt-backend). for instructions on setting up and starting the server.

Once the server is running, you can start the ControlIt client application using the following command:

To clone and run the ControlIt project locally, follow these steps:

1. Clone the ControlIt repository using Git:

    ```sh
    git clone https://github.com/your-username/ControlIt.git
    ```

2. Navigate to the project directory:

    ```sh
    cd ControlIt
    ```
3. Install the dependencies:

    ```sh
    npm install
    ```
4. run the project using this script:

    ```sh
    npm run dev
    ```
5. This will start the development server and compile the ControlIt application. You should see an output indicating that the server is running.

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the ControlIt application.
7. In the home page, click on the login button to enter the login page.

8. On the login page, select one of the accounts from the table below. These accounts have already been created on the server.

   | id | partner_name | email                 | password |
   |----|--------------|-----------------------|----------|
   | 1  | Partner A    | user1@example.com     | pass123  |
   | 2  | Partner B    | user1@example.com     | pass123  |
   | 3  | Partner C    | user2@example.com     | pass123  |
   | 4  | Partner D    | user3@example.com     | pass123  |

   Enter the corresponding email and password for the selected account.

## License

ControlIt is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgements

ControlIt makes use of several open-source libraries and frameworks. We would like to acknowledge and express our gratitude to the developers of these projects for their contributions.

- Vue.js - [https://vuejs.org](https://vuejs.org)
- TypeScript - [https://www.typescriptlang.org](https://www.typescriptlang.org)
- Vuetify - [https://vuetifyjs.com](https://vuetifyjs.com)
- Pinia - [https://pinia.esm.dev](https://pinia.esm.dev)

If you have any questions or need further assistance, please don't hesitate to contact us. Happy controlling with ControlIt!
