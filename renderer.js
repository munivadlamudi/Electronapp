const { ipcRenderer } = require('electron');

function scanLicense() {
  const fileInput = document.getElementById('fileInput');
  const filePath = fileInput.files[0]?.path;

  if (filePath) {
    window.ipcRenderer.send('scan-license', filePath);
  } else {
    alert('Please select a file.');
  }
}

ipcRenderer.on('scan-result', (event, result) => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>${result}</p>`;
});

function extractTextFromImage() {
  const fileInput = document.getElementById('fileInput');
  const filePath = fileInput.files[0]?.path;

  if (filePath) {
    window.ipcRenderer.send('scan-license', filePath);
  } else {
    alert('Please select a file.');
  }
}

ipcRenderer.on('display-extracted-text', (event, extractedText) => {
  console.log('Received extracted text:', extractedText);
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<p>${extractedText}</p>`;
});
