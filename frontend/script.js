const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

function uploadFile() {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
            loadFileList(); // Reload the file list
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a file to upload.');
    }
}

function loadFileList() {
    fetch('http://localhost:3000/files')
        .then(response => response.json())
        .then(files => {
            fileList.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file;
                const downloadLink = document.createElement('a');
                downloadLink.href = `http://localhost:3000/files/${file}`;
                downloadLink.textContent = 'Download';
                downloadLink.target = '_blank';
                li.appendChild(downloadLink);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteFile(file, li);
                li.appendChild(deleteButton);
                fileList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteFile(fileName, li) {
    fetch(`http://localhost:3000/files/${fileName}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        fileList.removeChild(li);
    })
    .catch(error => console.error('Error:', error));
}

// Load file list on page load
loadFileList();
