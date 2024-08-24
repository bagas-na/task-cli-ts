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
      if (args.length === 2) {
        addTask(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task add <description>");
      }
      break;
    case "update:":
      if (args.length === 3) {
        updateTask(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task update <id> <description>");
      }
      break;
    case "delete":
      if (args.length === 2) {
        deleteTask(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task delete <id>");
      }
      break;
    case "list":
      if (args.length === 2 || args.length === 3) {
        listTask(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task list [filter: to-do|in-progress|done]");
      }
      break;
    case "mark-to-do":
      if (args.length === 2) {
        updateTaskStatus(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task mark-to-do <id>");
      }
      break;
    case "mark-in-progress":
      if (args.length === 2) {
        updateTaskStatus(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task mark-in-progress <id>");
      }
      break;
    case "mark-done":
      if (args.length === 2) {
        updateTaskStatus(args, openJSONFile, writeJSONFile);
      } else {
        console.log("Usage: task mark-done <id>");
      }
      break;
    default:
      console.log(
        "Invalid command. Supported commands are: add, update, delete, list, mark-to-do, mark-in-progress, mark-done."
      );
  }
};

const main = () => {
  parseCommand(process.argv);
};

main();
