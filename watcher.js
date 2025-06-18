require('dotenv').config();
const chokidar = require('chokidar');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// === ENV CONFIG === //
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;
const WATCH_DIR = process.env.WATCH_DIR;
const LOG_FILE = process.env.LOG_FILE || './watcher.log'; // fallback if log path isn't set

// === Email Setup === //
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// === Logging Function === //
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${message}\n`;
  console.log(logMsg.trim());
  fs.appendFileSync(LOG_FILE, logMsg, { flag: 'a' });
};

// === Send Email Notification === //
const sendEmail = (filePath, subject, text) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject: `${subject} Detected`,
    text: `${text}:\n\n${filePath}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      log(`❌ Email Error: ${error}`);
    } else {
      log(`📧 Email sent: ${info.response}`);
    }
  });
};

// === File Watcher === //
const watcher = chokidar.watch(WATCH_DIR, {
  ignored: false,
  persistent: true,
  ignoreInitial: true,
  depth: 99,
});

watcher.on('all', (event, filePath) => {
  switch (event) {
    case 'add':
      log(`📄 File added: ${filePath}`);
      sendEmail(filePath, 'File Added','📄 File Added');
      break;
    case 'addDir':
      log(`📁 Directory added: ${filePath}`);
      sendEmail(filePath, 'Directory Added','📁 Directory Added');
      break;
    case 'change':
      log(`✏️ File modified: ${filePath}`);
      sendEmail(filePath, 'File Modified','✏️ File Modified');
      break;
    default:
      break;
  }
});

log(`👀 Watching for changes in: ${WATCH_DIR}`);
