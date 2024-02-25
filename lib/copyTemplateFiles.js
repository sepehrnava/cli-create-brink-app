import fs from "fs";
import shell from "shelljs";
import path from "path";

export default function copyTemplateFiles(source, destination) {
  // check if the destination directory exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  shell.cp("-R", path.join(source, "*"), destination); // Copy non-hidden files
  shell.cp("-R", path.join(source, ".*"), destination); // Copy hidden files
}
