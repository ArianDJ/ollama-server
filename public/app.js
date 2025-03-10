document.getElementById('promptForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const responseArea = document.getElementById('response');
    
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        responseArea.innerHTML += `<p><strong>You:</strong> ${prompt}</p>`;
        responseArea.innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;
        document.getElementById('prompt').value = '';
        responseArea.scrollTop = responseArea.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        responseArea.innerHTML += `<p class="error">Error: ${error.message}</p>`;
    }
});
