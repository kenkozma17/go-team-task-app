## About GoTeam Task Management App

A task management UI (kanban board) that consumes an API built using Laravel (https://github.com/kenkozma17/go-team-task-api).

## Setup

1. Clone repository to local or remote server (https://cli.vuejs.org/guide/deployment.html#references) where you can deploy/serve/build the application.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the following values to it:
   ```
   VUE_APP_API_URL="http://localhost:80" # or https://your-website.com
   VUE_APP_PUSHER_KEY="xxxx" # Refer to email instructions for key
   VUE_APP_PUSHER_CLUSTER="xxxx" # Refer to email instructions for cluster
   ```
4. Run `npm run serve` to run the application or `npm run build` if you want to generate a static website. More information about that here: https://cli.vuejs.org/guide/deployment.html
5. Navigate to `/` and you should be prompted to login and use the application.
