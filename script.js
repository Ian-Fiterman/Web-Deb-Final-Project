document.addEventListener("DOMContentLoaded", () => {
    let timeTravelButtonClicked = false;
    document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        const revealButton = document.getElementById("reveal-button");
        const timeTravelButton = document.getElementById("timeTravelButton");
        const timelineContainer = document.getElementById("timeline-container");
        if (clickedElement.id === "reveal-button") {
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
            if (!timeTravelButtonClicked) {
                revealAd(leftAd);
                revealAd(rightAd);
                timeTravelButtonClicked = true;
                timeTravelButton.textContent =
                    "It did say the past, didn't it? Just kidding! Click to go to the Games page, 4 realz th1s t1me!";
                timeTravelButton.setAttribute("href", "games.html");
            } else {
                window.location.href = "games.html";
            }
        }
    });
});

if (window.location.href.includes("games.html")) {
    restyleAd(leftAd);
    restyleAd(rightAd);
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
            onComplete: () => {
                timeTravelButton.classList.remove("hidden");
                gsap.fromTo(
                    timeTravelButton,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, ease: "power3.out" }
                );
            },
        }
    );
}

function randomColorCode() {
    let rRand = Math.floor(Math.random() * 256);
    let gRand = Math.floor(Math.random() * 256);
    let bRand = Math.floor(Math.random() * 256);
    return `rgb(${rRand}, ${gRand}, ${bRand})`;
}

function restyleAd(adElement) {
    const adText = adElement.querySelector("p");
    const ads = [
        "Buy 1 for the price of 2, get 1 free! (Limited Time Offer)",
        "Your computer has a virus... Oh wait, that's just us!",
        "Exclusive offer: 50% off on items priced at 150%!",
        "Pretend there's an ad here... Isn't that nostalgic?",
        "Hurry, only 1,000,000 items left in stock!",
        "Oh look, a fancy ad for [insert last Google search]!",
        "Get a free trip to Mars... just kidding, you're stuck here.",
        "Warning: Clicking this ad will change nothing... except your life choices.",
        "Introducing the product that doesn't exist... Send $€¥ to make it real!",
        "Congrats! You’ve just wasted 30 seconds of your life on this ad!",
    ];

    adElement.style.color = randomColorCode();
    adElement.style.backgroundColor = randomColorCode();
    adText.textContent = ads[Math.floor(Math.random() * ads.length)];
}

function revealAd(adElement) {
    adElement.classList.remove("hidden");
    const xShift = adElement.id === "rightAd" ? "100%" : "-100%";
    gsap.fromTo(
        adElement,
        { x: xShift, opacity: 0 },
        { x: "0%", opacity: 1, duration: 1, ease: "power3.out" }
    );
    restyleAd(adElement);
}

function hideAd(adElement) {
    const xShift = adElement.id === "rightAd" ? "100%" : "-100%";
    gsap.fromTo(
        adElement,
        { x: "0%", opacity: 1 },
        {
            x: xShift,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                adElement.classList.add("hidden");
            },
        }
    );
}

function closeButtonClicked(adElement) {
    hideAd(adElement);
    setTimeout(function () {
        revealAd(adElement);
    }, 3000);
}

function loadGame(url) {
    document.getElementById("gameFrame").src = url;
}
