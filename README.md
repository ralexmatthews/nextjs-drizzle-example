# Next.js-Drizzle Example

This is a toy app that uses Next.js 14 and Drizzle ORM to make a very simple task manager. This repo was more than anything meant to be a learning exercise for me to learn Drizzle.

## Next.js

This app uses the Next.js app router, and has 3 pages:

- `/`: just an overview of the task list and users
- `/users`: A list of the users with the ability to add users
- `/tasks`: A list of the tasks with the ability to add tasks, assign tasks to users, and mark tasks as completed

All of these routes are server components and the mutations are implemented using server actions, which use Drizzle.

### Styling

This app also uses TailwindCSS and DaisyUI for the styling. It is just very basic out-of-the-box styling options from DaisyUI.

## Drizzle

This app uses Drizzle as an ORM. All of the database stuff live in `./src/db`. The general idea is that you define the schema of the database in `./src/db/schema.ts` and Drizzle will create TypeScript types from the schema.

It also has commands to run migrations. Those are:

```shell
pnpm generate-migrations # create SQL statements in `./drizzle`
pnpm migrate # run the migrations from that directory
```

From there, the index file exports a database that can be used in the application for the selects and updates and whatnot.

**NOTE:** Currently the credentials for my docker MySQL database are hard-coded in the connection file. In real applications, you should have these in a .env file or similar. I only did that because I am lazy and didn't want to set that up.
