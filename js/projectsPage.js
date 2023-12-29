
// Projects data
const projects = [
    // Project details: name, type, position, and image link
    {
        name: 'PROJECT ONE',
        type: 'WEB DESIGN',
        pos: 'start',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=2370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    {
        name: 'Landing Page',
        type: 'Web Design',
        pos: 'mid',
        image: '../assets/Projects/LandingPage.png' 
    },
    {
        name: 'Portfolio',
        type: 'Website',
        pos: 'end',
        image: '../assets/Projects/Portfolio.gif'
    },
    {
        name: 'Age Countdown',
        type: 'Application',
        pos: 'mid',
        image: '../assets/Projects/AgeCountdown.png' 
    },
    {
        name: 'Preloader',
        type: 'Animation',
        pos: 'end',
        image: '../assets/Projects/Preloader.png' 
    },
    {
        name: 'Stock Price Prediction',
        type: 'Machine Learning',
        pos: 'mid',
        image: '../assets/Projects/StockPricePrediction.png' 
    },
    {
        name: 'Truth & Dare',
        type: 'Application',
        pos: 'start',
        image: '../assets/Projects/TruthAndDare.png',
        link: 'https://anshitsinha.github.io/truth-or-dare/'
    },

    {
        name: 'Product Page',
        type: 'Web Design',
        pos: 'end',
        image: '../assets/Projects/ProductPage.png',
        link: 'https://instagram.com'
    },
];

// Function to create project panels
const createProjects = () => {
    projects.forEach(project => {
        let panel = document.createElement('div');
        panel.classList.add('project', `${project.pos}`);
        let imageContainer = document.createElement('div');
        imageContainer.className = `image-container`;
        let imageDiv = document.createElement('div');
        let imageLink = document.createElement('a');
        imageLink.href = project.link;
        imageLink.target = '_blank';
        let image = document.createElement('img');
        image.classList.add('project-image');
        image.src = project.image;
        let overlayButton = document.createElement('a');
        overlayButton.innerText = 'View Project';
        overlayButton.classList.add('overlay-button');
        overlayButton.style.visibility = 'hidden';
        overlayButton.href = project.link;

        // Event listeners for mouseover and mouseout to show/hide the button
        imageDiv.addEventListener('mouseover', () => {
            overlayButton.style.visibility = 'visible';
        });
        imageDiv.addEventListener('mouseout', () => {
            overlayButton.style.visibility = 'hidden';
        });

        // Event listener for moving the button with the mouse
        imageDiv.addEventListener('mousemove', (event) => {
            const speed = 0.45; // Adjust the speed factor as needed
            const displacement = 1; // Adjust the displacement factor as needed
            const rect = imageDiv.getBoundingClientRect();
            const mouseX = event.clientX - rect.left - rect.width / 2;
            const mouseY = event.clientY - rect.top - rect.height / 2;
            const buttonX = (mouseX / rect.width) * 100 * speed - displacement;
            const buttonY = (mouseY / rect.height) * 100 * speed - displacement;
            overlayButton.style.left = `calc(50% + ${buttonX}px)`;
            overlayButton.style.top = `calc(50% + ${buttonY}px)`;
        });

        // Set the initial position of the button to the center of the image
        overlayButton.style.left = `50%`;
        overlayButton.style.top = `50%`;
        overlayButton.style.transform = 'translate(-50%, -50%)';

        // Appending elements
        imageLink.appendChild(image);
        imageDiv.append(imageLink, overlayButton);
        imageContainer.appendChild(imageDiv);
        let projectDetails = document.createElement('div');
        projectDetails.classList.add('project-details');
        let projectTitle = document.createElement('p');
        projectTitle.innerText = project.name;
        let projectType = document.createElement('a');
        projectType.innerText = project.type;
        projectDetails.append(projectTitle, projectType);
        panel.append(imageContainer, projectDetails);
        document.querySelector('.projects-slider').appendChild(panel);
    });
};

// Styling for the overlay button
const style = document.createElement('style');
style.innerHTML = `
    .overlay-button {
        position: absolute;
        display: inline-block;
        padding: 10px ;
        border: 0;
        text-decoration: none;
        border-radius: 15px;
        background-color: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(30px);
        color: rgba(255,255,255,0.8);
        font-size: 14px;
        letter-spacing: 2px;
        cursor: pointer;
        text-transform: uppercase;
    }
`;
document.head.appendChild(style);



function lerp(start, end, t){
    return start * ( 1 - t ) + end * t;
}

        
        
        const main = document.querySelector('main');
        const video = document.querySelector('video');
        const videoSection = document.querySelector('#video');
        
        createProjects();

        
        main.addEventListener('scroll', () => {
            animateVideo()
        })
        
        
        
        
        // Projects
        
        const projectsSticky = document.querySelector('.projects-sticky');
        const projectSlider = document.querySelector('.projects-slider');
        
        let projectTargetX = 0;
        let projectCurrentX = 0;
        
        let percentages = {
            small: 700,
            medium: 300,
            large: 100
        }
        
        let limit = window.innerWidth <= 600 ? percentages.small :
                    window.innerWidth <= 1100 ? percentages.medium :
                    percentages.large
        
        function setLimit(){
            limit = window.innerWidth <= 600 ? percentages.small :
                    window.innerWidth <= 1100 ? percentages.medium :
                    percentages.large
        }
        
        window.addEventListener('resize', setLimit);
        
        function animateProjects(){
            let offsetTop = projectsSticky.parentElement.offsetTop;
            let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100;
            percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
            projectTargetX = percentage;
            projectCurrentX = lerp(projectCurrentX, projectTargetX, .1);
            projectSlider.style.transform = `translate3d(${-(projectCurrentX)}vw, 0 , 0)`;
        }
        
        
        
        
        
        
        
        // Text reveal
        
        const textReveals = [...document.querySelectorAll('.text-reveal')];
        
        let callback = (entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    console.log(entry);
                    [...entry.target.querySelectorAll('span')].forEach((span, idx) => {
                        setTimeout(() => {
                            span.style.transform = `translateY(0)`;
                        }, (idx+1) * 50)
                    })
                }
            })
        })
        
        let options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        
        let observer = new IntersectionObserver(callback, options);
        
        textReveals.forEach(text => {
            let string = text.innerText;
            let html = '';
            for(let i = 0; i < string.length; i++){
                html += `<span>${string[i]}</span>`;
            }
            text.innerHTML = html
            observer.observe(text);
        })
        
        
        function animate(){
            animateProjects();
            requestAnimationFrame(animate)
        }
        
        main.addEventListener('scroll', () => {
            scrollBlogPosts();
            scrollCircle();
            scrollDiscover()
        })
        
        animate()
        
        
        
        
        // Header animation        
        
        
        document.addEventListener("DOMContentLoaded", function(){
            let tl = gsap.timeline({paused: true});
            
            tl.to(".menu-overlay", {
                duration: 1,
                clipPath: "polygon (0 0,100% 0, 100% 100%, 0 100%)",
                ease: "power2.out",
            });
            
            tl.from(
                ".menu-link, .btn",{
                    opacity: 0,
                    y: 60,
                    stagger: 0.05,
                    duration: 0.75,
                    ease: "power1.inOut",
                },
                "<",
            );
            
            tl.to (
                ".video-preview",
                {
                    duration: 1,
                    height: "200px",
                    ease: "power2.out",
                },
                "<",
            );
            
            tl.to (
                ".menu-divider", {
                    duration: 2,
                    width: "100%",
                    ease: "power4.out"
                },
                "<",
            );
            
            function openMenu() {
                document.querySelector(".menu-overlay").style.visibility = "visible";
                
                document.querySelector("nav").style.display= "none";
                tl.seek(0); // Reset the timeline to its initial state
                
                tl.play();
               
            }
            
            function closeMenu() {
                document.querySelector("nav").style.display = "flex";
               
                tl.reverse ();
                document.querySelector(".menu-overlay").style.visibility = "hidden";
                
                
                
                
            }
            
        
        
        
            
        
        
            
            document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
            document.querySelector(".menu-close-btn").addEventListener("click", closeMenu);
            
        });
        
        
        //cursor
        
        
        const cursorDot = document.querySelector("[data-cursor-dot]");
        const cursorOutline = document.querySelector("[data-cursor-outline]");
        
        window.addEventListener("mousemove", function(e){
        
            const posX = e.clientX;
            const posY= e.clientY;
        
            cursorDot.style.left =`${posX}px`;
            cursorDot.style.top =`${posY}px`;
        
            // cursorOutline.style.left =`${posX}px`;
            // cursorOutline.style.top =`${posY}px`;
        
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            },
            {duration: 500, fill: "forwards"})
        
        })
        
        document.addEventListener("DOMContentLoaded", function () {
            const cursorDot = document.querySelector("[data-cursor-dot]");
            const cursorOutline = document.querySelector("[data-cursor-outline]"); 
            const links = document.querySelectorAll("a");
          
            links.forEach((link) => {
              link.addEventListener("mouseenter", () => {
                cursorDot.style.transform = "scale(5.5) translate(-8%, -8%)";
                  cursorOutline.style.visibility = "hidden";   
              });
              
              link.addEventListener("mouseleave", () => {
                cursorDot.style.transform = "scale(1) translate(-50%, -50%)";
                cursorOutline.style.visibility = "visible"; 
                
              });
            });
          
          });

                  
        const pls = document.querySelector(".pls");
        const preview = document.querySelector(".preview");
        const previewImg = document.querySelector(".preview-img");
        
        let isInside = false;
        
        const bgPositions = {
            p1: "0 0",
            p2: "0 25%",
            p3: "0 50%",
            p4: "0 75%",
            p5: "0 100%",
        };
        
        const moveStuff = (e) => {
            const mouseInside = ismouseInsideContainer(e);
        
            if (mouseInside !== isInside) {
                isInside = mouseInside;
                if (isInside) {
                    gsap.to(preview, {
                        scale: 1,
                        ease: 'power2.inOut',
                        transformOrigin: 'center center',
                    });
                } else {
                    gsap.to(preview, {
                        scale: 0,
                        ease: 'power2.inOut',
                        transformOrigin: 'center center',
                    });
                }
            }
        };
        
        const movepl = (e) => {
            const offsetX = preview.offsetWidth / 2;
            const offsetY = preview.offsetHeight / 2;
        
            // Use pageX and pageY to get the absolute position relative to the document's body
            preview.style.left = e.pageX - offsetX + "px";
            preview.style.top = e.pageY - offsetY + "px";
        };
        
        const moveplImg = (pl) => {
            const plId = pl.id;
            gsap.to(previewImg, 0.4, {
                backgroundPosition: bgPositions[plId] || "0 0",
            });
        };
        
        const ismouseInsideContainer = (e) => {
            const containerRect = document.querySelector(".pdata").getBoundingClientRect();
            return (
                e.pageX >= containerRect.left &&
                e.pageX <= containerRect.right &&
                e.pageY >= containerRect.top &&
                e.pageY <= containerRect.bottom
            );
        };
        
        window.addEventListener("mousemove", moveStuff);
        window.addEventListener("mousemove", movepl);
        
        Array.from(document.querySelectorAll('.pdata .pl')).forEach((pl) => {
            pl.addEventListener("mousemove", () => moveplImg(pl));
        });

        function updateLiveTime() {
            const now = new Date();
            const options = {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            };
            const formattedTime = now.toLocaleString('en-US', options);
            document.getElementById('liveTime').textContent = formattedTime;
          }
        
          // Update time every second
          setInterval(updateLiveTime, 1000);
        
          // Initial call to display time
          updateLiveTime();

          var toggle = document.getElementById('projectbtn');
        var toggleprojectbtn = document.getElementById('toggle-projectbtn');
        var list = document.querySelector(".container");
        var grid = document.getElementById('projects');

        var toggleNumber;

        toggle.addEventListener('click', function() {
            toggleNumber = !toggleNumber;
            if (toggleNumber) {
                toggleprojectbtn.style.clipPath = 'inset(0 0 0 50%)';
                toggleprojectbtn.style.backgroundColor = '#fff';
                GridFunction(); // Call List function
            } else {
                toggleprojectbtn.style.clipPath = 'inset(0 50% 0 0)';
                toggleprojectbtn.style.backgroundColor = '#fff';
                ListFunction(); // Call grid function
            }
            console.log(toggleNumber);
        });

        function GridFunction() {
            list.style.display = 'none';
            grid.style.display = 'block';
        }

        function ListFunction() {
            grid.style.display = 'none';
            list.style.display = 'flex';
        }