# 📁 file-change-detector

A Node.js utility that watches for file and directory **additions** and **modifications** in a specified directory, and sends **email notifications** in real time.

This is ideal for monitoring sensitive folders in a production or development environment.

---

## ✅ Requirements

    Node.js v24

    NPM

    PM2 (optional, for production background process)

    Gmail account with App Password enabled


## 🔧 Environment Setup (`.env`)

Create a `.env` file in the project root with the following contents:

```env
EMAIL_USER=sender@mail.com
EMAIL_PASS=****************
EMAIL_TO=receiver@mail.com
WATCH_DIR=/home/fahad/Workspace/sacp
LOG_FILE=/home/fahad/sacp-watcher.log
```



## 🚀 Getting Started


### 1. Install Node.js v24 (using NVM)


```code

nvm install 24
nvm use 24
```

### 2. Install dependencies

```code 

npm install
```

### 3. Run the watcher manually

```code
node watcher.js

```


## ⚙️ Running in Background with PM2 (Recommended for Production)

```code

nvm install 24
npm install
npm install -g pm2@latest
pm2 start watcher.js --name sacp-watcher
pm2 save                                         # Save the process list
pm2 startup                                      # Auto-start on system boot (follow PM2's instructions)

```




## 🔍 What It Tracks

        1. ✅ File added (add)
        2. ✅ Directory added (addDir)
        3. ✅ File modified (change)

Each event sends an email and logs the event to the configured log file.


## 📄 Logs

All detected changes are saved to the file defined in LOG_FILE, with timestamps. Example:

```code
[2025-06-18T14:30:21.456Z] 📄 File added: /home/fahad/Workspace/sacp/example.txt
```


