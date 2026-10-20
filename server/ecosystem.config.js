module.exports = {
  apps: [
    {
      name: "nextprep-server",
      script: "./server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      restart_delay: 1500,
      max_restarts: 100,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
