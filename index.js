import fs from 'fs';
import inquirer from 'inquirer';

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your Project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'What does this application do?',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions'
    },
    {
      type:'input',
      name: 'usage',
      message:'Enter usage information'
    },
    {
      type: 'list',
      name: 'license',
      message: 'Select a licennse for this application',
      choices: ['MIT', 'Academic Free License v3.0', 'Apache license 2.0', 'Artistic license 2.0', 'Do What The F*ck You Want To Public License', 'Boost Software License 1.0', 'Eclipse Public License 1.0', 'Microsoft Public License']
    },
    {
      type: 'confirm',
      name: 'contribution',
      message: 'Will your project be open to contributions?'
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Please explain your contribution guidelines.'
    },
    {
      type:'input',
      name:'githubUsername',
      message:'Enter your GitHub Username'
    },
    {
      type:'input',
      name:'email',
      message:'Enter your email address'
    },

  ])
}
  
const generateREADME = (data) => {
  const licenseBadge = `[![License](https://img.shields.io/badge/license-${encodeURIComponent(data.license)}-green)](./LICENSE)`;
  return `# ${data.title}
  
  ${licenseBadge}
  
  ## Description
  ${data.description}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

  ## Usage
  ${data.usage}

  ## Contributing
  ${data.contributing}

  ## License
  This project is licensed under the ${data.license}

  ## Tests
  ${data.tests}

  ## Questions
  
  For additional questions you can reach me throught:
  - [GitHub](http://github.com/${data.githubUsername})
  - [Email] ${data.email}`;
}

async function init() {
  try {
    const userData = await promptUser();
    const readmeInfo = generateREADME(userData);
    fs.writeFileSync('./dist/README.md', readmeInfo);
    console.log('README.md generated successfully!');
  } catch (error) {
    console.error('Error generating README', error.message);
  }
}

init();