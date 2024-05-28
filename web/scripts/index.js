document.addEventListener('DOMContentLoaded', function() {
    const tweetText = document.getElementById('tweetText');
    const resultContainer = document.getElementById('result');
    const predictButton = document.querySelector('button[onclick="searchTweet()"]');

    tweetText.addEventListener('input', function() {
        if (tweetText.value.trim() === '') {
            resetResultContainer();
        }
    });

    predictButton.addEventListener('click', function() {
        searchTweet();
    });

    tweetText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchTweet();
        }
    });

    function resetResultContainer() {
        const sentimentSpan = document.getElementById('sentimentValue');
        const emotionSpan = document.getElementById('emotionValue');
        sentimentSpan.textContent = '';
        emotionSpan.textContent = '';
    }

    function searchTweet() {
        const tweetTextValue = tweetText.value.trim();
        
        if (tweetTextValue === '') {
            resetResultContainer();
            return;
        }

        fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: tweetTextValue, model: 'stack1' })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            displayEmotion(data.prediction);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    function displayEmotion(emotion) {
        let emoji;
        let sentiment;
        switch (emotion) {
            case 'anger':
                emoji = 'Anger 😡';
                sentiment = "Negative";
                break;
            case 'disgust':
                emoji = 'Disgust 🤢';
                sentiment = "Negative";
                break;
            case 'fear':
                emoji = 'Fear 😨';
                sentiment = "Negative";
                break;
            case 'guilt':
                emoji = 'Guilt 😳';
                sentiment = "Negative";
                break;
            case 'joy':
                emoji = 'Joy 😊';
                sentiment = "Positive";
                break;
            case 'love':
                emoji = 'Love ❤️';
                sentiment = "Positive";
                break;
            case 'sadness':
                emoji = 'Sadness 😢';
                sentiment = "Negative";
                break;
            case 'shame':
                emoji = 'Shame 😔';
                sentiment = "Negative";
                break;
            case 'surprise':
                emoji = 'Surprise 😯';
                sentiment = "Positive";
                break;
            default:
                emoji = "Not Recognized ❓";
                sentiment = "Not Recognized";
        }

        const sentimentSpan = document.getElementById('sentimentValue');
        const emotionSpan = document.getElementById('emotionValue');

        sentimentSpan.textContent = sentiment;
        emotionSpan.textContent = emoji;
    }

    resetResultContainer();
});
