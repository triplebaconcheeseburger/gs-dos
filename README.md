# GS-DOS Terminal Interface Project

This project is a terminal-like interface built with Node.js and Express.js. The application simulates a command-line environment in the browser, where users can execute commands such as `ls`, `cd`, and `help`. The project is designed to be both a fun and educational tool, showcasing how traditional terminal commands can be replicated in a web environment.

## Features

- **Command-Line Interface:** Execute commands like `ls`, `cd`, `help`, and more.
- **Dynamic Directory Navigation:** Navigate through directories just like in a real terminal.
- **Help Command:** Display helpful information and command usage instructions.

## Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **NPM:** Node.js comes with NPM (Node Package Manager) installed. Make sure it’s available by running `npm -v` in your terminal.

## 1. Installation

Follow these steps to set up the project locally:

1.  Clone the Repository:
  ```
  git clone https://github.com/triplebaconcheeseburger/gs-dos.git
  ```

2. Navigate to the Project Directory:
```
cd gs-dos
```

3. Install Dependencies:
After navigating to the project directory, install the required dependencies by running:
```
npm install
```
This command will install all the packages listed in package.json and create a node_modules directory.

## Running the Project
To start the project and run the Node.js server:

1. Start the Server:
You can start the server by running:
```
npm start
```
This will start the Node.js server on localhost:3000.

2. Access the Application:
Open your web browser and navigate to:
```
http://localhost:3000/
```
The application will open, and you can start interacting with the terminal interface.

### Terminal Commands
Here are some of the commands you can run in the terminal interface:

* `ls`: Lists the contents of the current directory.
* `cd` <directory>: Changes the current directory to the specified directory.
* `cd` ..: Moves up one level in the directory structure.
* `help`: Displays the help text and lists available commands.


## Additional Commands: 
Add more commands as needed in the terminalCommands object in script.js.

## Contributing
Contributions are welcome! If you'd like to add more features or improve existing ones, feel free to submit a pull request.


