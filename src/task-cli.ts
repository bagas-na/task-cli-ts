import fs from "node:fs/promises";
import process from "process";

const PATH = "./task-list.json";

const parseJSONFile = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error: unknown) {
    if (typeof error === "string") {
      console.log(`Error reading file: ${error}`);
    } else if (error instanceof Error) {
      console.log(`Error reading file: ${error.message}`);
    }
  }
};

const parseCommand = async (args: string[]) => {
  args = args.slice(2);

  switch (args[0]) {
    case "add":
      break;
    case "update:":
      break;
    case "delete":
      break;
    case "list":
      break;
    case "mark-to-do":
      break;
    case "mark-in-progress":
      break;
    case "mark-done":
      break;
    default:
      console.log(
        "Invalid command. Supported commands are: add, update, delete, list, mark-to-do, mark-in-progress, mark-done."
      );
  }
};



const main = async () => {
  const tasks = await parseJSONFile(PATH);
  console.log(process.argv.slice(2));
  console.table(tasks);
  parseCommand(process.argv)
};

main();
