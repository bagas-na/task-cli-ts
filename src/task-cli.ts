import fs from "node:fs/promises";
import process from "process";

const JSON_PATH = "./task-list.json";

type task = {
  id: number;
  description: string;
  status: "to-do" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
};

const openJSONFile = async (filePath: string): Promise<task[]> => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error: unknown) {
    if (typeof error === "string") {
      console.error(`Error reading file: ${error}`);
    } else if (error instanceof Error) {
      console.error(`Error reading file: ${error.message}`);
    }
    throw error;
  }
};

const writeJSONFile = async (filePath: string, tasks: task[]): Promise<void> => {
  try {
    const data = JSON.stringify(tasks);
    await fs.writeFile(filePath, data);
  } catch (error: unknown) {
    if (typeof error === "string") {
      console.error(`Error reading file: ${error}`);
    } else if (error instanceof Error) {
      console.error(`Error reading file: ${error.message}`);
    }
    throw error;
  }
};

const addTask = async (
  args: string[],
  open: (path: string) => Promise<task[]>,
  write: (path: string, data: task[]) => Promise<void>
): Promise<void> => {
  try {
    const data = await open(JSON_PATH);
    const newTask: task = {
      id: Math.max(...data.map((task) => task.id)) + 1,
      description: args[1],
      status: "to-do",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await write(JSON_PATH, [...data, newTask]);

  } catch (error: unknown) {
    if (typeof error === "string") {
      console.error(`Error reading file: ${error}`);
    } else if (error instanceof Error) {
      console.error(`Error reading file: ${error.message}`);
    }
    throw error;
  }
};

const updateTask = async (
  args: string[],
  open: (path: string) => Promise<task[]>,
  write: (path: string, data: task[]) => Promise<void>
): Promise<void> => {};

const deleteTask = async (
  args: string[],
  open: (path: string) => Promise<task[]>,
  write: (path: string, data: task[]) => Promise<void>
): Promise<void> => {};

const listTask = async (
  args: string[],
  open: (path: string) => Promise<task[]>,
  write: (path: string, data: task[]) => Promise<void>
): Promise<void> => {};

const updateTaskStatus = async (
  args: string[],
  open: (path: string) => Promise<task[]>,
  write: (path: string, data: task[]) => Promise<void>
): Promise<void> => {};

const parseCommand = async (args: string[]): Promise<void> => {
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
