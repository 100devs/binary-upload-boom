const container = document.getElementById('container');
        const streamCount = 14;
        const trailLength = 20;

        function createStream(index) {
            const stream = document.createElement('div');
            stream.className = `number-stream stream-${index + 1}`;
            
            // Create trail of numbers
            for (let i = 0; i < trailLength; i++) {
                const number = document.createElement('span');
                number.className = 'number';
                number.textContent = Math.floor(Math.random() * 10);
                
                // Fade effect - numbers at the tail are more transparent
                const opacity = (i / trailLength) * 0.8 + 0.2;
                number.style.opacity = opacity;
                
                stream.appendChild(number);
            }
            
            container.appendChild(stream);
            
            // Animate each stream independently
            animateStream(stream);
            
            return stream;
        }

        function animateStream(stream) {
            // Random duration between 10-18 seconds
            const duration = 10000 + Math.random() * 8000;
            // Random horizontal movement pattern
            const movements = [
                { x: 0, y: -100 },
                { x: Math.random() * 80 - 40, y: 25 },
                { x: Math.random() * 80 - 40, y: 50 },
                { x: Math.random() * 60 - 30, y: 75 },
                { x: Math.random() * 40 - 20, y: 110 }
            ];
            
            let startTime = null;
            
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const progress = (elapsed % duration) / duration;
                
                // Calculate position with snake-like movement
                let currentX = 0;
                let currentY = 0;
                
                if (progress < 0.2) {
                    currentX = movements[0].x + (movements[1].x - movements[0].x) * (progress / 0.2);
                    currentY = movements[0].y + (movements[1].y - movements[0].y) * (progress / 0.2);
                } else if (progress < 0.4) {
                    currentX = movements[1].x + (movements[2].x - movements[1].x) * ((progress - 0.2) / 0.2);
                    currentY = movements[1].y + (movements[2].y - movements[1].y) * ((progress - 0.2) / 0.2);
                } else if (progress < 0.6) {
                    currentX = movements[2].x + (movements[3].x - movements[2].x) * ((progress - 0.4) / 0.2);
                    currentY = movements[2].y + (movements[3].y - movements[2].y) * ((progress - 0.4) / 0.2);
                } else {
                    currentX = movements[3].x + (movements[4].x - movements[3].x) * ((progress - 0.6) / 0.4);
                    currentY = movements[3].y + (movements[4].y - movements[3].y) * ((progress - 0.6) / 0.4);
                }
                
                stream.style.bottom = `${currentY}%`;
                stream.style.transform = `translateX(${currentX}px)`;
                stream.style.opacity = 1;
                
                requestAnimationFrame(animate);
            }
            
            // Start animation with random delay
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, Math.random() * duration);
        }

        // Create all streams
        const streams = [];
        for (let i = 0; i < streamCount; i++) {
            streams.push(createStream(i));
        }

        // Update numbers frequently
        function updateNumbers() {
            streams.forEach(stream => {
                const numbers = stream.querySelectorAll('.number');
                numbers.forEach((num, index) => {
                    // Update each number to a random digit
                    num.textContent = Math.floor(Math.random() * 10);
                    
                    // Maintain fade effect
                    const opacity = (index / trailLength) * 0.8 + 0.2;
                    num.style.opacity = opacity;
                });
            });
        }

        // Update numbers every 100ms for rapid changes
        setInterval(updateNumbers, 100);