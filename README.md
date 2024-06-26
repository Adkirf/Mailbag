# Mailbabg

### A customizable Client to manage your E-mails and contacts. 


[Subscription at railway experied - backend unavaialbe](https://mailbag-production.up.railway.app)

## Table of contents
* About
* Acknowledgments
* Template
* Contact


## About The Project

Mailbag is a customizable UI for your email account that gives you access to mailboxes, receive/send/reply/delete emails, and add/delete contacts. You can test  Mailbag [here](https://mailbag-production.up.railway.app) and follow the template to connect your own email account. The Frontend uses React and the Material UI library for a basic Client, and under the hood nodejs and express as the Backend. 

  ### Frontend 
  Main component of the Mailbag client is the state object returned by the state.js file. This Object saves all values that are displayed, and manages the Application's state. The object is created at the root of the components tree, and pass down to all other components. The global state object allows each component to access the session's data, and update the displayed content by calling the object's state-changing functions. At the same time the object functions as a communication bridge to the server. The config file saves the server's and email address, and connects the cient to the server. 
  
  ### Backend
  The Backend offers GET, POST and DELETE api calls to manage the user's emails and contacts. It receives emails through the imap protocol and the node-imap library. Sending emails is achieved with the smtp protocol and and mailparser library. Contacts are managed using the NedDB library to create a NoSQL database that lives within the server. The serverInfo.json contains the configuration to connect the backend to the user's email account. 
  
 Both, connection to the server and user account are build when the code is compiled. Which means that once deployed the user account cannot be changed. 
  
  ### Notes
  The biggest issues encoutered were not during wriiting the code it self but the set-up. Most files are written in TypeScript, which requieres webpack to complie them into JavaScript. Specially for the Client, which containts jsx, setting up the Loaders and Plugins tested my knowldge about Webpack. And runnnig in the localhost, deploying it to a publicly accessible domain required more research on server's and how they to connect clients to them. 
This project was great to build a foundational understanding of clients, servers and how they can be connected. 



## Acknowledgments

This project follows a exmaple of the book: "Modern Full-Stack Development Using TypeScript, React, Node.js, Webpack, Python, Django, and Docker" by Frank Zammetti. 
  


## Template

You can use the Mailbag with your own email account using your localhost, or deploy it to server hosting platforms like [Railway](https://railway.app).  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Adkirf/Mailbag.git
   ```
   and install the dependency with 
   ```sh
   npm install 
   ```
   
2. Configure the Client
  In the client/src/code/config.ts modify 
  ```sh
  export const config: {
    serverAddress: string, userEmail: string} = 
    {serverAddress : "<your server address or localhost:Port>", userEmail: "<your email address>"}
   ```
   After that you need to rebuild the dist directoy by using the terminal command: 
   ```sh
   npm run build
   ```
3. Configure the Server
  In the server/serverInfo.json modify 
  ```sh 
   {
      "smtp" : {
          "host" : "<your host smtp>", "port" : <your smtp port>,
          // you can add smtp configurations here
      },
      "imap" : {
          "host" :  "<your host imap>", "port" : <your imap port>
           // you can add smtp configurations here
      }
    }
   ```
   Note that without bigger changes in the server code, you cannot use pop3. 
   
4. Add .env variables
   In the root directory of Mailbag add a .env file and add the variables 
   ```sh
   EMAIL_USER = "<your email address>"
   EMAIL_PASS = "<your email password>"
   ```
   If you deploy Mailbag to server hosting platform remember to add the environment variables. 
   
  
  

## Contact

Twitter - [@adkirf](https://twitter.com/adkirf)

Project Link: [Adkirf Portfolio](https://portfolio-v2-nu-ivory.vercel.app/)

If you have any suggestions that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!


