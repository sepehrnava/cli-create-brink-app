#!/usr/bin/env node

import inquirer from "inquirer";
import shell from "shelljs";
import fs from "fs";
import path from "path";
import colors from "colors";
import { fileURLToPath } from "url";

// Define __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function init() {
  console.log("Welcome to the Brink Agency App generator!\n".yellow);

  console.log("By default Typescript is included in the project.\n".brightBlue);

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "My Brink App",
      validate: (input) =>
        input.length > 0 || "Please enter a valid project name.",
    },
  ]);

  // Project directory based on the project name
  const projectDir = path.join(process.cwd(), projectName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "Select the framework:",
      choices: ["Next.js"],
    },
    {
      type: "confirm",
      name: "eslint",
      message: "Do you want to include ESLint?",
      default: true,
    },
    {
      type: "confirm",
      name: "prettier",
      message: "Do you want to include Prettier?",
      default: true,
    },
    {
      type: "checkbox",
      name: "features",
      message: "What features do you want to include?",
      choices: [
        "Tailwind CSS",
        "GSAP",
        "zustand",
        "daisyUI",
        "smooth-scrollbar",
      ],
      default: ["Tailwind CSS", "GSAP", "zustand", "daisyUI"],
    },
  ]);

  function copyTemplateFiles(source, destination) {
    // check if the destination directory exists
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    shell.cp("-R", path.join(source, "*"), destination); // Copy non-hidden files
    shell.cp("-R", path.join(source, ".*"), destination); // Copy hidden files
  }

  let templateDir = path.join(__dirname, "templates", "default");

  copyTemplateFiles(templateDir, projectDir);

  // remove if eslint is not selected
  if (!answers.eslint) {
    fs.unlinkSync(path.join(projectDir, ".eslintrc.json"));
  }

  if (!answers.prettier) {
    fs.unlinkSync(path.join(projectDir, ".prettierrc"));
  }

  // add the name of the project in package.json file
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(
    `Template files have been copied successfully to ${projectName}.`.green
  );
}

init();
