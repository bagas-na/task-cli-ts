"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
const process_1 = __importDefault(require("process"));
const JSON_PATH = "./task-list.json";
const dateTimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
};
const dateTimeFormat = new Intl.DateTimeFormat('id-ID', dateTimeOptions);
const openJSONFile = async (filePath) => {
    try {
        const data = await promises_1.default.readFile(filePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const writeJSONFile = async (filePath, tasks) => {
    try {
        const data = JSON.stringify(tasks);
        await promises_1.default.writeFile(filePath, data);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const addTask = async (args, open, write) => {
    try {
        const data = await open(JSON_PATH);
        const newID = Math.max(...data.map((task) => Number(task.id))) + 1;
        const newTask = {
            id: String(newID),
            description: args[1],
            status: "to-do",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        await write(JSON_PATH, [...data, newTask]);
        console.log(`Task added successfully (ID: ${newID})`);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const updateTask = async (args, open, write) => {
    try {
        const taskId = args[1];
        const newDescription = args[2];
        const data = await open(JSON_PATH);
        const index = data.findIndex((task) => task.id === taskId);
        if (index === -1) {
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }
        data[index] = {
            ...data[index],
            description: newDescription,
            updatedAt: new Date().toISOString(),
        };
        await write(JSON_PATH, data);
        console.log(`Task updated successfully (ID: ${taskId})`);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const deleteTask = async (args, open, write) => {
    try {
        const taskId = args[1];
        let data = await open(JSON_PATH);
        const index = data.findIndex(task => task.id === taskId);
        if (index === -1) {
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }
        data = data.filter((_, i) => i !== index);
        await write(JSON_PATH, data);
        console.log(`Task deleted successfully (ID: ${taskId})`);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const listTask = async (args, open, write) => {
    try {
        let data = await open(JSON_PATH);
        data = data.map(task => {
            task.createdAt = dateTimeFormat.format(Date.parse(task.createdAt));
            task.updatedAt = dateTimeFormat.format(Date.parse(task.updatedAt));
            return task;
        });
        if (args.length === 1) {
            console.table(data);
            return;
        }
        switch (args[1]) {
            case "to-do":
                console.table(data.filter((task) => task.status === "to-do"));
                break;
            case "in-progress":
                console.table(data.filter((task) => task.status === "in-progress"));
                break;
            case "done":
                console.table(data.filter((task) => task.status === "done"));
                break;
            default:
                console.log("Usage: task-cli list [to-do|in-progress|done]");
                break;
        }
        return;
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const updateTaskStatus = async (args, open, write) => {
    try {
        const newStatus = args[0].slice(5);
        const taskId = args[1];
        const data = await open(JSON_PATH);
        const index = data.findIndex((task) => task.id === taskId);
        if (index === -1) {
            console.error(`Task not found (ID: ${taskId})`);
            return;
        }
        data[index] = {
            ...data[index],
            status: newStatus,
            updatedAt: new Date().toISOString(),
        };
        await write(JSON_PATH, data);
        console.log(`Task status updated successfully (ID: ${taskId})`);
    }
    catch (error) {
        if (typeof error === "string") {
            console.error(`Error reading file: ${error}`);
        }
        else if (error instanceof Error) {
            console.error(`Error reading file: ${error.message}`);
        }
        throw error;
    }
};
const parseCommand = async (args) => {
    args = args.slice(2);
    switch (args[0]) {
        case "add":
            if (args.length === 2) {
                addTask(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli add <description>");
            }
            break;
        case "update":
            if (args.length === 3) {
                updateTask(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli update <id> <description>");
            }
            break;
        case "delete":
            if (args.length === 2) {
                deleteTask(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli delete <id>");
            }
            break;
        case "list":
            if (args.length === 1 || args.length === 2) {
                listTask(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli list [filter: to-do|in-progress|done]");
            }
            break;
        case "mark-to-do":
            if (args.length === 2) {
                updateTaskStatus(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli mark-to-do <id>");
            }
            break;
        case "mark-in-progress":
            if (args.length === 2) {
                updateTaskStatus(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli mark-in-progress <id>");
            }
            break;
        case "mark-done":
            if (args.length === 2) {
                updateTaskStatus(args, openJSONFile, writeJSONFile);
            }
            else {
                console.log("Usage: task-cli mark-done <id>");
            }
            break;
        default:
            console.log("Invalid command. Supported commands are: add, update, delete, list, mark-to-do, mark-in-progress, mark-done.");
    }
};
const main = () => {
    parseCommand(process_1.default.argv);
};
main();
