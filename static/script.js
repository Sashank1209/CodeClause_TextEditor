document.addEventListener('DOMContentLoaded', function () {
    const textArea = document.getElementById('text-area');
    const loadButton = document.getElementById('load-button');
    const saveButton = document.getElementById('save-button');
    const deleteButton = document.getElementById('delete-button');

    loadButton.addEventListener('click', function () {
        fetch('/load', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                textArea.value = data.content;
            })
            .catch(error => {
                console.error('Error loading the file:', error);
            });
    });

    saveButton.addEventListener('click', function () {
        const content = textArea.value;
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('File saved successfully.');
                } else {
                    console.error('Error saving the file.');
                }
            })
            .catch(error => {
                console.error('Error saving the file:', error);
            });
    });

    deleteButton.addEventListener('click', function () {
        // Clear the text area
        textArea.value = '';

        // Send a request to the server to delete the file
        fetch('/delete', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('File deleted successfully.');
                } else {
                    console.error('Error deleting the file.');
                }
            })
            .catch(error => {
                console.error('Error deleting the file:', error);
            });
    });
});
