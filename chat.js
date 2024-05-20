const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const url = 'https://openai-api-gpt-3-5-turbo.p.rapidapi.com/api/v1/chat/completions';
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '28ef78d402msh82fb3a79e796dc5p10ac5djsn0b72ecc4372c',
            'X-RapidAPI-Host': 'openai-api-gpt-3-5-turbo.p.rapidapi.com'
        },
        body: JSON.stringify({
            model: 'gemma-7b',
		messages: [
			{
				role: 'assistant',
				content: 'Your are good at coding. Your name is Github Copilot.'
			},
			{
				role: 'user',
				content: `${userMessage}`
			}
		],
		temperature: 0.5,
		top_p: 0.95,
		max_tokens: -1,
		use_cache: false,
		stream: false
        })
    };


    (async()=>{
        try {
        
         
            const response = await fetch(url, options);
      
            const result = await response.json();
            
            
    
           console.log(result.choices[0].message.content)

           messageElement.textContent = result.choices[0].message.content.trim();
            
            // let text = result.choices[0].message.content;
            // let index = 0;
            
            //     function typeWriter() {
            //         document.querySelector('.res1').textContent += text[index];
            //         index++;
            //         if (index < text.length) {
            //           setTimeout(typeWriter, 20); // Adjust the speed of typing here (in milliseconds)
            //         }
            //       }
                  
            //       typeWriter();
        } catch (error) {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
            console.error(error);
        }
    })()
    // Send POST request to API, get response and set the reponse as paragraph text
    // fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    //     messageElement.textContent = result.choices[0].message.content.trim();
    // }).catch(() => {
    //     messageElement.classList.add("error");
    //     messageElement.textContent = "Oops! Something went wrong. Please try again.";
    // }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));