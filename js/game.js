
    let x=-100, y=-100;
    const background = document.getElementById("ogolny-gry");
    const overlay = document.getElementById("overlay");
    var lightPower = 250;

    window.addEventListener("mousemove", function(event) {
      x = event.clientX+window.pageXOffset-(background.offsetLeft*2-window.innerWidth/2-background.offsetWidth/2);
      y = event.clientY+window.pageYOffset-(background.offsetTop*2-window.innerHeight/2-background.offsetHeight/2)-30;      
    });
   
    function nowy() {
        const lightSize = Math.sin(Date.now() / 500) * 20 + lightPower;
        const outerGradient = `radial-gradient(circle at ${x}px ${y}px, transparent ${lightSize-100}px, black ${lightSize + 1}px)`;
        const innerGradient = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 0, 0) 0%, rgba(255, 255, 0, 1) ${lightSize - 20}%, rgba(255, 255, 255, 1) ${lightSize}%)`;
    
        overlay.style.backgroundImage = `${outerGradient}, ${innerGradient}`;
        requestAnimationFrame(nowy);
    };
    nowy();
    
