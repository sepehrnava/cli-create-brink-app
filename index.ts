#!/usr/bin/env node

import inquirer from "inquirer";
import shell from "shelljs";
import { exec } from "child_process";

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "typescript",
      message: "Do you want to include TypeScript?",
      default: false,
    },
    {
      type: "confirm",
      name: "gsap",
      message: "Do you want to include GSAP?",
      default: false,
    },
  ]);

  const repoURL = "https://github.com/sepehrnava/create-brink-app-source.git";
  const cloneCommand = `git clone --depth 1 ${repoURL} && rm -rf ./create-brink-app-source/.git`;

  exec(cloneCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  if (answers.typescript) {
    // Modify cloneCommand or select a different branch/folder based on the answer
  }

  if (answers.gsap) {
    // Modify cloneCommand or select a different branch/folder based on the answer
  }

  shell.exec(cloneCommand);

  // Additional commands to install dependencies or modify the project
}

init();
