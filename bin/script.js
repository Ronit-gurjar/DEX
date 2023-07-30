#!/usr/bin/env node
const inquirer = require('inquirer');
const CURR_DIR = process.cwd();
const fs = require('fs');

const repoValidator = async (input) => {
  if (!input.includes("https://github.com/")) {
     return 'Invalid repo';
  }
  return true;
};

const QUESTIONS = [
  {
    type:"input",
    message:"Project name:",
    default:"Chrome-Ext-project",
    name:"project_name",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    type:"confirm",
    message:"Have you created a GitHub repo for this project?",
    name:"repoGithub"
  },
  {
    type:"input",
    message:"GitHub Repo link(https):",
    name:"repo",
    validate: repoValidator,
    when(answers) {
      return answers.repoGithub;
    },
  },
  {
      type:"list",
      message:"Would you like to use a framework?:",
      name:"framework",
      choices:["react","vanilla"]
  },
  {
    type:"list",
    message:"which variant would you prefer?:",
    name:"variant",
    choices:["Typescript","Javascript"]
  },
  {
    type:"confirm",
    message:"would you like to use tailwind css?:",
    name:"tailwind"
  }
]



inquirer
  .prompt(QUESTIONS)
  .then(answers => {
    const projectName = answers['project_name']; //string
    const repoUrl = answers['repo']; //string
    const frameworkChoice = answers['framework']; //string
    const variant = answers['variant']; //string
    const wantTailwind = answers['tailwind']; //boolean
    function style(){
      if (wantTailwind === "true") {
       return ' & tailwindCSS';
      }
      else{
        return ' & no tailwindCSS';
      }
    }
    console.log( "creating "+ projectName +" on "+ repoUrl +" repo, with "+ frameworkChoice +" + "+ variant + style());
  });