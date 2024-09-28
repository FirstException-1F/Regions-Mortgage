
const ANIMATION_DURATIONS = {
    FIRST_PART: 2500,
    SECOND_PART: 3500,
    THIRD_PART: 2500,
    FOURTH_PART: 1900,
    FIFTH_PART: 3100
};


const elements = {
    logoImg: document.querySelector(".logo img"),
    loginButton: document.querySelector(".login-button button"),
    emailInput: document.querySelector(".content input[type='text']"),
    passwordInput: document.querySelector(".content input[type='password']"),
    content: document.querySelector(".content"),
    footerHeadersH3: document.querySelectorAll(".footer-header h3"),
    footerHeadersImg: document.querySelector(".footer-header img"),
    newCustomerDiv: document.querySelector(".new-customer"),
    logoInfoH2Elements: document.querySelectorAll(".logoinfo h2"),
    imageOverlay: document.querySelector(".Image-overlay"),
    loader: document.querySelector(".loader"),
    contentButtonH3: document.querySelector(".content button h3"),
    circle: document.querySelector(".circle"),
    newCustomerH3: document.querySelector(".new-customer-header h3")
};


let logoImgCenterX, logoImgCenterY, linePoints;


function DDALine(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;
    const points = [];

    for (let i = 0, x = x1, y = y1; i <= steps; i++) {
        points.push({x: Math.round(x), y: Math.round(y)});
        x += xIncrement;
        y += yIncrement;
    }

    return points;
}

function updatePosition() {
    const rect = elements.logoImg.getBoundingClientRect();
    logoImgCenterX = rect.left + rect.width / 2;
    logoImgCenterY = rect.top + rect.height / 2;
    linePoints = DDALine(logoImgCenterX, logoImgCenterY, window.innerWidth / 2, window.innerHeight / 2);
}

// Animation Functions
function rotateAndMoveImageTowardsCenter() {
    linePoints.forEach((point, i) => {
        elements.logoImg.style.transform = `translate(${point.x - logoImgCenterX}px, ${point.y - logoImgCenterY}px) rotate(360deg)`;
    });
    setTimeout(() => {
        const lastPoint = linePoints[linePoints.length - 1];
        elements.logoImg.style.transform = `translate(${lastPoint.x - logoImgCenterX}px, ${lastPoint.y - logoImgCenterY}px) rotate(360deg) scale(0)`;   
    }, ANIMATION_DURATIONS.SECOND_PART);
}

function rotateAndMoveImageBackToOriginalPosition() {
    for (let i = linePoints.length - 1; i >= 0; i--) {
        elements.logoImg.style.transition = "all cubic-bezier(0.34, 1.2, 0.64, 1) 0.8s";
        elements.logoImg.style.transform = `translate(${linePoints[i].x - logoImgCenterX}px, ${linePoints[i].y - logoImgCenterY}px) rotate(0deg) scale(1)`;
        elements.circle.style.left = `${linePoints[i].x}px`;
        elements.circle.style.top = `${linePoints[i].y}px`;
        elements.circle.style.transition = "all cubic-bezier(0.34, 1.2, 0.64, 1) .7s";
    }
}

function firstPartOfAnimation() {
    elements.contentButtonH3.style.transition = "all ease 1s";
    elements.contentButtonH3.style.transform = "translateX(100%)";
  
    setTimeout(() => {
        elements.loader.style.left = "50%";
        elements.loader.style.transition = "all ease 1s";
    }, 200);

    setTimeout(() => {
        elements.emailInput.style.background = elements.passwordInput.style.background = "rgba(119, 119, 119, .3)";
        elements.logoInfoH2Elements.forEach(h2 => h2.style.animation = "LeftSidewithTranslateX 2s forwards");
        elements.newCustomerDiv.style.animation = "DownSidewithOpacityAndTranslateY 2s forwards";
        elements.footerHeadersH3.forEach(h3 => h3.style.animation = "AnimateFooterHeader .5s forwards");
        elements.footerHeadersImg.style.animation = "AnimateFooterHeader .5s forwards";
        elements.content.style.animation = "DownSidewithOpacityAndTranslateY 2s forwards";
      
    }, ANIMATION_DURATIONS.FIRST_PART);
}

function secondPartOfAnimation() {
    rotateAndMoveImageTowardsCenter();
    elements.imageOverlay.style.transform = "scale(0)";
}

function thirdPartOfAnimation() {
    const width = window.innerWidth;
    if (width >= 769) {
        elements.imageOverlay.style.width = "calc(100vw - 40px)";
    } else if (width > 480) {
        elements.imageOverlay.style.height = "calc(200vh - 40px)";
    } else if (width > 375) {
        elements.imageOverlay.style.height = "calc(200vh - 30px)";
    } else if (width > 320) {
        elements.imageOverlay.style.height = "calc(200vh - 16px)";
    } else {
        elements.imageOverlay.style.height = "calc(200vh - 5px)";
    }

    setTimeout(() => {
        elements.imageOverlay.style.transition = "all cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s";
        elements.imageOverlay.style.transform = "scale(1.003)";
        setTimeout(() => {
            elements.imageOverlay.style.transform = "scale(1)";
        }, 100);
    }, 1400);

    setTimeout(() => {
        elements.circle.style.transform = "translate(-50%, -50%) scale(1)";
    }, 1700);

    setTimeout(() => {
        const lastPoint = linePoints[linePoints.length - 1];
        elements.logoImg.style.transform = `translate(${lastPoint.x - logoImgCenterX}px, ${lastPoint.y - logoImgCenterY}px) rotate(360deg) scale(1)`;   
    }, ANIMATION_DURATIONS.THIRD_PART);
}

function fourthPartOfAnimation() {
    rotateAndMoveImageBackToOriginalPosition();
    elements.imageOverlay.style.transition = `all cubic-bezier(0.34, 1.56, 0.64, 1) ${ANIMATION_DURATIONS.FOURTH_PART}ms`;
    elements.imageOverlay.style[window.innerWidth >= 769 ? 'width' : 'height'] = "100%";
}

function fifthPartOfAnimation() {
    elements.circle.style.display = "none";
    elements.loader.style.left = "-50%";
    elements.emailInput.style.background = elements.passwordInput.style.background = "white";
    elements.contentButtonH3.style.transform = "translateX(0%)";
    elements.newCustomerH3.style.opacity = "0";
    elements.newCustomerH3.style.transform = "translateX(100%)";

    setTimeout(() => {
        elements.logoInfoH2Elements.forEach(h2 => h2.style.animation = "RightSidewithTranslateX 2s forwards");
        elements.newCustomerDiv.style.animation = "upSidewithOpacityAndTranslateY 2s forwards";
        setTimeout(() => {
            elements.newCustomerH3.style.transform = "translateX(0%)";
            elements.newCustomerH3.style.opacity = "1";
        }, 2200);
    }, 800);

    setTimeout(() => {
        elements.content.style.animation = "upSidewithOpacityAndTranslateY 2s forwards";
        setTimeout(() => {
            elements.footerHeadersH3.forEach(h3 => h3.style.animation = "AnimateFooterHeaderUpside 1s forwards");
            elements.footerHeadersImg.style.animation = "AnimateFooterHeaderUpside 1s forwards";
        }, 2200);
    }, ANIMATION_DURATIONS.FIFTH_PART);

    setTimeout(() => {
       alert("Thank You for Visiting Regions Mortgage Website");
    },  6300);
}


updatePosition();
window.addEventListener("resize", () => {
    updatePosition();
    location.reload();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

elements.loginButton.addEventListener("click", () => {
    const emailValue = elements.emailInput.value;
    const passwordValue = elements.passwordInput.value;
    if (!isValidEmail(emailValue)) {
        alert("Please enter a valid email address.");

        return;
    }
    if(passwordValue.length < 8) {
        alert("Please enter a password with at least 8 characters.");
        return;
    }
    elements.emailInput.value = '';
    elements.passwordInput.value = '';
  
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(firstPartOfAnimation, 300);
    setTimeout(secondPartOfAnimation, 4200);
    setTimeout(thirdPartOfAnimation, 8000);
    setTimeout(fourthPartOfAnimation, 12000);
    setTimeout(fifthPartOfAnimation, 13000);

    document.body.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
        document.body.style.pointerEvents = "auto";
        document.body.style.overflow = "auto";
    }, 19500); 
});
