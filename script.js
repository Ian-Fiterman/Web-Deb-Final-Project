document.addEventListener("DOMContentLoaded", () => {
    let timeTravelButtonClicked = false;
    document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.id === "reveal-button") {
            const revealButton = document.getElementById("reveal-button");
            const timelineContainer =
                document.getElementById("timeline-container");
            gsap.to(revealButton, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    revealButton.style.display = "none";
                    timelineContainer.classList.remove("hidden");
                    animateTimelineEvents();
                },
            });
        } else if (clickedElement.id === "timeTravelButton") {
            event.preventDefault();
            const timeTravelButton =
                document.getElementById("timeTravelButton");
            if (!timeTravelButtonClicked) {
                revealAds();
                timeTravelButtonClicked = true;
                timeTravelButton.textContent =
                    "Just Kidding! Go to the Games page";
                timeTravelButton.setAttribute("href", "games.html");
            } else {
                window.location.href = "games.html";
            }
        }
    });
});

if (window.location.pathname === "/games.html") {
    revealAds();
}

function loadGame(url) {
    document.getElementById("gameFrame").src = url;
    restyleAds();
}

function animateTimelineEvents() {
    const timelineEvents = document.querySelectorAll(".timeline-event");
    gsap.fromTo(
        timelineEvents,
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
        }
    );
}

function randomColorCode() {
    let rRand = Math.floor(Math.random() * 256);
    let gRand = Math.floor(Math.random() * 256);
    let bRand = Math.floor(Math.random() * 256);
    return `rgb(${rRand}, ${gRand}, ${bRand})`;
}

function restyleAds() {
    const leftAd = document.getElementById("leftAd");
    const rightAd = document.getElementById("rightAd");
    const ads = [
        "Buy 1 for the price of 2, get 1 free! (Limited time offer)",
        "Your computer has a virus... Oh wait, that's just us!",
        "Exclusive offer: 50% off on items priced at 150%!",
        "Pretend there's an ad here... Isn't that Nostalgic?",
        "Hurry, only 1,000,000 items left in stock!",
        "Oh look a fancy ad for [insert last Google search]!",
        "Get a free trip to the moon... just kidding, you're stuck here.",
        "Warning: Clicking this ad will change nothing... except your life choices.",
        "Introducing the product that doesn't exist... Don't ask questions.",
        "Congratulations! You’ve just wasted 30 seconds of your life.",
    ];
    leftAd.style.color = randomColorCode();
    leftAd.style.backgroundColor = randomColorCode();
    leftAd.textContent = ads[Math.floor(Math.random() * ads.length)];
    rightAd.style.color = randomColorCode();
    rightAd.style.backgroundColor = randomColorCode();
    rightAd.textContent = ads[Math.floor(Math.random() * ads.length)];
}

function revealAds() {
    const leftAd = document.getElementById("leftAd");
    const rightAd = document.getElementById("rightAd");
    leftAd.classList.remove("hidden");
    rightAd.classList.remove("hidden");
    restyleAds();
}
