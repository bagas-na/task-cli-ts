# Task CLI - A Task Tracker CLI App

Task CLI is a command-line task tracker written in TypeScript and designed to run on Node.js. It helps users manage and track their tasks efficiently directly from the terminal. This project is a part of the roadmap.sh [backend projects](https://roadmap.sh/projects?g=backend), serving as a practical implementation of task management features in a CLI environment.

## Features
- Add, update, and remove tasks
  ```bash
  # Adding a new task
  node task-cli.js add "Buy groceries"
  # Output: Task added successfully (ID: 1)

  # Updating and deleting tasks
  node task-cli.js update 1 "Buy groceries and cook dinner"
  node task-cli.js delete 1
  ```
- List all tasks
  ```bash
  # Listing all tasks
  node task-cli.js list

  # Listing tasks by status
  node task-cli.js list done
  node task-cli.js list todo
  node task-cli.js list in-progress
  ```
- Mark tasks as to-do, in progress, and completed
  ```bash
  # Marking a task as to-do, in progress or done
  node task-cli.js mark-to-do 1
  node task-cli.js mark-in-progress 1
  node task-cli.js mark-done 1
  ```

## Requirements
- Node.js
- TypeScript

## Installation
To install and run the app, use the following commands:

```bash
git clone https://github.com/bagas-na/task-cli-ts.git
cd task-cli-ts
node task-cli.js [commands]
```
