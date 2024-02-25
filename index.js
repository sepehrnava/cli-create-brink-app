#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import colors from "colors";
import { fileURLToPath } from "url";
import copyTemplateFiles from "./lib/copyTemplateFiles.js";

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

  let templateDir = path.join(__dirname, "templates", "default");

  copyTemplateFiles(templateDir, projectDir);

  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  // remove if eslint is not selected
  if (!answers.eslint) {
    fs.unlinkSync(path.join(projectDir, ".eslintrc.json"));
  }

  if (!answers.prettier) {
    fs.unlinkSync(path.join(projectDir, ".prettierrc"));
  }

  // conditionally remove the features

  if (!answers.features.includes("zustand")) {
    fs.rm(path.join(projectDir, "src/store"), { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
    delete packageJson.dependencies.zustand;
  }

  if (!answers.features.includes("Tailwind CSS")) {
    fs.rm(path.join(projectDir, "tailwind.config.ts"), (err) => {
      if (err) {
        console.error(err);
      }
    });
    fs.rm(path.join(projectDir, "postcss.config.js"), (err) => {
      if (err) {
        console.error(err);
      }
    });
    const globalCssPath = path.join(projectDir, "src/styles/globals.scss");
    const globalCss = fs.readFileSync(
      path.join(__dirname, "templates", "noTailwindCssFile", "globals.scss")
    );
    fs.writeFileSync(globalCssPath, globalCss);

    delete packageJson.devDependencies.tailwindcss;
    delete packageJson.devDependencies.autoprefixer;
  }

  if (!answers.features.includes("daisyUI")) {
    const tailwindConfigPath = path.join(projectDir, "tailwind.config.ts");
    const tailwindConfig = fs
      .readFileSync(tailwindConfigPath)
      .toString()
      .replace("plugins: [require('daisyui')],", "");
    fs.writeFileSync(tailwindConfigPath, tailwindConfig);

    delete packageJson.devDependencies.daisyui;
  }

  if (!answers.features.includes("GSAP")) {
    const appFile = path.join(projectDir, "src/pages/_app.tsx");
    let appFileContent = fs.readFileSync(appFile).toString();
    appFileContent = appFileContent.replace("import { gsap } from 'gsap';", "");
    appFileContent = appFileContent.replace(
      "import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';",
      ""
    );
    appFileContent = appFileContent.replace(
      "import { SplitText } from 'gsap/dist/SplitText';",
      ""
    );
    appFileContent = appFileContent.replace(
      "gsap.registerPlugin(ScrollTrigger, SplitText);",
      ""
    );
    fs.writeFileSync(appFile, appFileContent);
    delete packageJson.dependencies.gsap;
  }
  if (answers.features.includes("smooth-scrollbar")) {
    const layoutFile = path.join(projectDir, "src/components/Layout/index.tsx");
    if (answers.features.includes("GSAP")) {
      const withGSAP = fs
        .readFileSync(
          path.join(__dirname, "templates", "smoothScrollFiles", "withGSAP.tsx")
        )
        .toString();
      fs.writeFileSync(layoutFile, withGSAP);
    } else {
      const withoutGSAP = fs
        .readFileSync(
          path.join(
            __dirname,
            "templates",
            "smoothScrollFiles",
            "withoutGSAP.tsx"
          )
        )
        .toString();
      fs.writeFileSync(layoutFile, withoutGSAP);
    }
  } else {
    delete packageJson.dependencies["smooth-scrollbar"];
  }

  // rename .gitignore.template to .gitignore
  fs.renameSync(
    path.join(projectDir, ".gitignore.template"),
    path.join(projectDir, ".gitignore")
  );

  // rename .npmrc.template to .npmrc
  fs.renameSync(
    path.join(projectDir, ".npmrc.template"),
    path.join(projectDir, ".npmrc")
  );

  // add the name of the project in package.json file
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(
    `\nTemplate files have been copied successfully to ${projectName}.\n`.green
  );

  if (answers.features.includes("GSAP")) {
    console.log(
      "\nDon't forget to add your GSAP license key in the .npmrc file!\n".yellow
    );
  }

  console.log("\nHappy coding!\n".brightBlue);
}

init();
