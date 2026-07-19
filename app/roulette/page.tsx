  // --- 100% FAIR ROLL ALGORITHM (KISMAT KA KHEL) ---
  const startRoll = () => {
    setGameState("rolling");
    
    // 1. Pure Random Winner Selection (Bina player ki bet dekhe)
    let finalWinner;
    const rand = Math.random();

    // Fair Probability: 
    // Red, Blue, Yellow (2x win) = 30% chance each (Total 90%)
    // Purple (5x win) = 10% chance
    if (rand < 0.30) {
       finalWinner = COLORS[0]; // Red
    } else if (rand < 0.60) {
       finalWinner = COLORS[1]; // Blue
    } else if (rand < 0.90) {
       finalWinner = COLORS[2]; // Yellow
    } else {
       finalWinner = COLORS[3]; // Purple
    }

    // 2. Generate Strip for the Wheel
    const targetIndex = 50; 
    const generatedStrip = Array.from({ length: 65 }).map((_, i) => {
      if (i === targetIndex) return finalWinner;
      
      // Fill remaining with random colors based on same fair probability
      const r = Math.random();
      if (r < 0.1) return COLORS[3]; // Purple
      if (r < 0.4) return COLORS[0]; // Red
      if (r < 0.7) return COLORS[1]; // Blue
      return COLORS[2]; // Yellow
    });

    setStripItems(generatedStrip);

    // 3. Exact Pixel Math for animation
    setTimeout(() => {
        if (!wheelContainerRef.current) return;
        const cw = wheelContainerRef.current.clientWidth;
        
        // Start position
        setTransitionStyle("none");
        setSliderTranslate((cw / 2) - (ITEM_WIDTH / 2));

        // Start Animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const exactCenterOfTarget = (targetIndex * TOTAL_ITEM_BLOCK) + (ITEM_WIDTH / 2);
            const offset = Math.floor(Math.random() * 40) - 20; 
            const finalTranslate = (cw / 2) - exactCenterOfTarget + offset;

            setTransitionStyle("transform 5s cubic-bezier(0.1, 0.9, 0.2, 1)");
            setSliderTranslate(finalTranslate);

            // 4. Conclude Roll
            setTimeout(() => {
              setWinningColor(finalWinner);
              setGameState("result");
              
              const winnings = playerBets[finalWinner.id] * finalWinner.mult;
              if (winnings > 0) {
                setBalance(prev => prev + winnings);
              }

              // Reset after 4 seconds
              setTimeout(() => {
                setPlayerBets({ red: 0, blue: 0, yellow: 0, purple: 0 });
                setWinningColor(null);
                setTimeLeft(15);
                setGameState("betting");
              }, 4000);

            }, 5000); // Wheel spins for 5s
          });
        });
    }, 50);
  };
                         
