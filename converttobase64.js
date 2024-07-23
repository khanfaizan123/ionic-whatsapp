const fs = require('fs');
const path = require('path');

// Specify the path to your serviceAccountKey.json file
const serviceAccountPath = path.join(__dirname, 'src/assets/serviceAccountKey.json');

// Read the JSON file
fs.readFile(serviceAccountPath, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  // Convert the file content to a base64 string
  const base64ServiceAccount = Buffer.from(data).toString('base64');
  
  // Print the base64 string
  console.log(base64ServiceAccount);
});
