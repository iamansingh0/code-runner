## Setup
### Prerequisite
- Node.js >= 4.0.0
- VsCode 

### Get Started
- Clone this repository
- Or download the code (zip file)
- After extracting the code files and opening the folder in code editor, run `npm install` to install the dependencies

## Instructions to Execute
1. Go to terminal and start the app using `npm start`
2. Now go to [http://localhost:3000/probot](http://localhost:3000/probot) and click on `register the app`
3. Follow the instructions and register your github app
4. Shut the server and restart again.
5. Choose any repository and create a new issue.
6. While creating the issue, in comment write this (sample code)
```
/execute
let firstNumbers = [1, 2, 3];
let secondNumbers = [4, 5, 6];
let merged = firstNumbers.concat(secondNumbers);
console.log(merged);
Language: js
```
7. Open/create the issue and the output of the sample code will be visible in the new comment executed by the bot.

## License

[ISC](LICENSE) © 2023 iamansingh0
