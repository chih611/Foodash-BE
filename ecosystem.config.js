module.exports = {
  apps: [
    {
      name: "ec2.foodash.org",
      script: "./src/server.js",
      env: {
        DB_USER: "admin",
        DB_PASSWORD: "capstone",
        DB_NAME: "foodash",
        DB_HOST:
          "db-instance-foodash.ctcw2oo2m3zo.ap-southeast-2.rds.amazonaws.com",
      },
    },
  ],
};
