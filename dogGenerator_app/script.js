const API_KEY = "api-key"
const submitButton = document.querySelector(".submit-button")
const inputPrompt = document.querySelector('input[name="image-script"]')
const imageSection = document.querySelector('.image-section')


function verifyPrompt() {
    const promptText = inputPrompt.value.toLowerCase()
    if (!promptText.includes("dog") && !promptText.includes("dogs")) {
        alert("Please include 'dog' or 'dogs' in your prompt!")
        return;
    }
    else getImages()
}


async function getImages() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": inputPrompt.value,
            "n": 1,
            "size": "1024x1024"
        })
      };
      
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', options)
      const data = await response.json()
      if (data && data.data[0]) {
        const imageGenerated = data.data[0]
        const imageContainer = document.createElement('div')
        imageContainer.classList.add('image-container')
        const imageElement = document.createElement('img')
        imageElement.setAttribute('src', imageGenerated.url)
        imageContainer.appendChild(imageElement)
        imageSection.appendChild(imageContainer)
      }
    }
    catch (err) {
      console.error(err);
    }
}

submitButton.addEventListener('click', verifyPrompt);
