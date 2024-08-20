document.addEventListener('DOMContentLoaded', function () {
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordField = document.getElementById('password-field');
    if (togglePassword && passwordField) {
        togglePassword.addEventListener('click', function () {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }

    function toggleForm(type) {
        const studentForm = document.getElementById("student-form");
        const visitorForm = document.getElementById("visitor-form");
        const submitButton = document.getElementById("btn-submit");

        if (studentForm && visitorForm && submitButton) {
            if (type === 'student') {
                studentForm.classList.remove("hidden");
                visitorForm.classList.add("hidden");
                submitButton.style.display = 'block';
            } else if (type === 'visitor') {
                visitorForm.classList.remove("hidden");
                studentForm.classList.add("hidden");
                submitButton.style.display = 'block';
            }
        }
    }
    
    // search-box open close js code
    const navbar = document.querySelector(".navbar");
    const searchBox = document.querySelector(".search-box .bx-search");

    if (navbar && searchBox) {
        searchBox.addEventListener("click", () => {
            navbar.classList.toggle("showInput");
            if (navbar.classList.contains("showInput")) {
                searchBox.classList.replace("bx-search", "bx-x");
            } else {
                searchBox.classList.replace("bx-x", "bx-search");
            }
        });
    }

    // sidebar open close js code
    const navLinks = document.querySelector(".nav-links");
    const menuOpenBtn = document.querySelector(".navbar .bx-menu");
    const menuCloseBtn = document.querySelector(".nav-links .bx-x");

    if (navLinks && menuOpenBtn && menuCloseBtn) {
        menuOpenBtn.onclick = function() {
            navLinks.style.left = "0";
        }
        menuCloseBtn.onclick = function() {
            navLinks.style.left = "-100%";
        }
    }

    // sidebar submenu open close js code
    const htmlcssArrow = document.querySelector(".htmlcss-arrow");
    const moreArrow = document.querySelector(".more-arrow");
    const jsArrow = document.querySelector(".js-arrow");

    if (htmlcssArrow) {
        htmlcssArrow.onclick = function() {
            navLinks.classList.toggle("show1");
        }
    }
    if (moreArrow) {
        moreArrow.onclick = function() {
            navLinks.classList.toggle("show2");
        }
    }
    if (jsArrow) {
        jsArrow.onclick = function() {
            navLinks.classList.toggle("show3");
        }
    }

    const submitButton = document.getElementById('btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission if it's inside a form
            window.location.href = 'homepage.html'; // Replace 'your-target-page.html' with the actual target page
        });
    }

    const carousel = document.querySelector(".carousel"); 
    const arrowBtns = document.querySelectorAll(".wrapper i"); 
    const wrapper = document.querySelector(".wrapper"); 
  
    const firstCard = carousel.querySelector(".card"); 
    const firstCardWidth = firstCard.offsetWidth; 
  
    let isDragging = false, 
        startX, 
        startScrollLeft, 
        timeoutId; 
  
    const dragStart = (e) => {  
        isDragging = true; 
        carousel.classList.add("dragging"); 
        startX = e.pageX; 
        startScrollLeft = carousel.scrollLeft; 
    }; 
  
    const dragging = (e) => { 
        if (!isDragging) return; 
      
        // Calculate the new scroll position 
        const newScrollLeft = startScrollLeft - (e.pageX - startX); 
      
        // Check if the new scroll position exceeds  
        // the carousel boundaries 
        if (newScrollLeft <= 0 || newScrollLeft >=  
            carousel.scrollWidth - carousel.offsetWidth) { 
              
            // If so, prevent further dragging 
            isDragging = false; 
            return; 
        } 
      
        // Otherwise, update the scroll position of the carousel 
        carousel.scrollLeft = newScrollLeft; 
    }; 
  
    const dragStop = () => { 
        isDragging = false;  
        carousel.classList.remove("dragging"); 
    }; 
  
    const autoPlay = () => { 
      
        // Return if window is smaller than 800 
        if (window.innerWidth < 800) return;  
          
        // Calculate the total width of all cards 
        const totalCardWidth = carousel.scrollWidth; 
          
        // Calculate the maximum scroll position 
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth; 
          
        // If the carousel is at the end, stop autoplay 
        if (carousel.scrollLeft >= maxScrollLeft) return; 
          
        // Autoplay the carousel after every 2500ms 
        timeoutId = setTimeout(() =>  
            carousel.scrollLeft += firstCardWidth, 2500); 
    }; 
  
    carousel.addEventListener("mousedown", dragStart); 
    carousel.addEventListener("mousemove", dragging); 
    document.addEventListener("mouseup", dragStop); 
    wrapper.addEventListener("mouseenter", () =>  
        clearTimeout(timeoutId)); 
    wrapper.addEventListener("mouseleave", autoPlay); 
  
    // Add event listeners for the arrow buttons to  
    // scroll the carousel left and right 
    arrowBtns.forEach(btn => { 
        btn.addEventListener("click", () => { 
            carousel.scrollLeft += btn.id === "left" ?  
                -firstCardWidth : firstCardWidth; 
        }); 
    }); 

    feather.replace();

    const controls = document.querySelector('.controls');
    const cameraOptions = document.querySelector('.video-options>select');
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    const screenshotImage = document.querySelector('img');
    const buttons = [...controls.querySelectorAll('button')];
    let streamStarted = false;
    
    const [play, pause, screenshot] = buttons;
    
    const constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
      }
    };
    
    const getCameraSelection = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const options = videoDevices.map(videoDevice => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
      });
      cameraOptions.innerHTML = options.join('');
    };
    
    play.onclick = () => {
      if (streamStarted) {
        video.play();
        play.classList.add('d-none');
        pause.classList.remove('d-none');
        return;
      }
      if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
          ...constraints,
          deviceId: {
            exact: cameraOptions.value
          }
        };
        startStream(updatedConstraints);
      }
    };
    
    const startStream = async (constraints) => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleStream(stream);
    };
    
    const handleStream = (stream) => {
      video.srcObject = stream;
      play.classList.add('d-none');
      pause.classList.remove('d-none');
      screenshot.classList.remove('d-none');
      streamStarted = true;
    };
    
    getCameraSelection();

    cameraOptions.onchange = () => {
        const updatedConstraints = {
          ...constraints,
          deviceId: {
            exact: cameraOptions.value
          }
        };
        startStream(updatedConstraints);
      };
      
      const pauseStream = () => {
        video.pause();
        play.classList.remove('d-none');
        pause.classList.add('d-none');
      };
      
      const doScreenshot = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        screenshotImage.src = canvas.toDataURL('image/webp');
        screenshotImage.classList.remove('d-none');
      };
      
      pause.onclick = pauseStream;
      screenshot.onclick = doScreenshot;
    
    
});
