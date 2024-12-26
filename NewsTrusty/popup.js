document.getElementById("log-title-button").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: extractContent,
        }, async (results) => {
            if (results && results[0] && results[0].result) {
                const { title, text } = results[0].result;

                const response = await fetch("http://localhost:5000/predict", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ title, text }),
                });

                const result = await response.json();
                
                console.log("Prediction:", result);

                const resultElement = document.getElementById("result");
                if (resultElement) {
                    resultElement.textContent = `Prediction: ${result.prediction}`;

                    if (result.prediction.toLowerCase() === "real") {
                        resultElement.style.color = "#00FF00";
                    } else if (result.prediction.toLowerCase() === "fake") {
                        resultElement.style.color = "red";
                    } else {
                        resultElement.style.color = "black";
                    }
                }
            }
        });
    }
});

function extractContent() {
    const h1Element = document.querySelector("h1");
    const pTags = document.querySelectorAll("p");

    const title = h1Element ? h1Element.innerText.trim() : "";
    const text = Array.from(pTags).map(p => p.innerText.trim()).join(" ");

    return { title, text };
}
