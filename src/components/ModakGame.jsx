import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, X } from 'lucide-react';
import { triggerFlowerShower } from '../utils/confetti';

export const ModakGame = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const gameState = useRef({
    score: 0,
    basketX: 180,
    basketWidth: 80,
    items: [],
    animId: null,
    spawnTimer: 0
  });

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    gameState.current.score = 0;
    gameState.current.items = [];
    gameState.current.basketX = 180;
  };

  const stopGame = () => {
    setIsPlaying(false);
    if (gameState.current.animId) cancelAnimationFrame(gameState.current.animId);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark canvas theme inside black box
      ctx.fillStyle = '#120E0C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      gameState.current.spawnTimer++;
      if (gameState.current.spawnTimer > 35) {
        gameState.current.spawnTimer = 0;
        const types = [
          { type: 'modak', label: '🥟', pts: 10, speed: 3.2 },
          { type: 'flower', label: '🌺', pts: 15, speed: 3.8 },
          { type: 'durva', label: '🌿', pts: 20, speed: 4.2 },
          { type: 'ego', label: '😈', pts: -10, speed: 3.0 }
        ];
        const randomItem = types[Math.floor(Math.random() * types.length)];
        gameState.current.items.push({
          x: Math.random() * (canvas.width - 30) + 15,
          y: -20,
          ...randomItem
        });
      }

      for (let i = gameState.current.items.length - 1; i >= 0; i--) {
        const item = gameState.current.items[i];
        item.y += item.speed;

        ctx.font = '22px serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, item.x, item.y);

        const basketY = canvas.height - 35;
        const basketX = gameState.current.basketX;
        const basketWidth = gameState.current.basketWidth;

        if (
          item.y >= basketY - 10 &&
          item.y <= basketY + 20 &&
          item.x >= basketX - basketWidth / 2 &&
          item.x <= basketX + basketWidth / 2
        ) {
          gameState.current.score += item.pts;
          if (gameState.current.score < 0) gameState.current.score = 0;
          setScore(gameState.current.score);

          if (gameState.current.score > 0 && gameState.current.score % 100 === 0) {
            triggerFlowerShower();
          }

          gameState.current.items.splice(i, 1);
          continue;
        }

        if (item.y > canvas.height + 20) {
          gameState.current.items.splice(i, 1);
        }
      }

      const bX = gameState.current.basketX;
      const bY = canvas.height - 25;
      const bW = gameState.current.basketWidth;

      ctx.beginPath();
      ctx.ellipse(bX, bY, bW / 2, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.fill();

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.fillText('थाळी 🪔', bX, bY + 4);

      gameState.current.animId = requestAnimationFrame(updateGame);
    };

    gameState.current.animId = requestAnimationFrame(updateGame);

    return () => {
      if (gameState.current.animId) cancelAnimationFrame(gameState.current.animId);
    };
  }, [isPlaying]);

  const handleTouchMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const scale = canvasRef.current.width / rect.width;
    gameState.current.basketX = Math.max(40, Math.min(canvasRef.current.width - 40, touchX * scale));
  };

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scale = canvasRef.current.width / rect.width;
    gameState.current.basketX = Math.max(40, Math.min(canvasRef.current.width - 40, mouseX * scale));
  };

  return (
    <section id="game" style={{ padding: '32px 0' }}>
      <div className="section-header">
        <h3 className="section-title">Modak Prasad Catcher</h3>
      </div>

      {!isPlaying ? (
        /* Black Box Launcher Container with Spacing */
        <div style={{
          background: '#120E0C',
          borderRadius: '24px',
          padding: '44px 20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          minHeight: '220px'
        }}>
          <button
            onClick={startGame}
            className="btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem',
              borderRadius: '28px'
            }}
          >
            <Gamepad2 size={22} /> Start Playing Game
          </button>
        </div>
      ) : (
        /* Black Box Active Game Container */
        <div style={{
          background: '#120E0C',
          borderRadius: '24px',
          padding: '16px',
          position: 'relative',
          touchAction: 'none',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '0.95rem', color: '#FEF08A', fontWeight: 700 }}>
              Score: {score}
            </span>
            <button
              onClick={stopGame}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#FFFBEB',
                padding: '6px 14px',
                borderRadius: '14px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <X size={14} /> Quit Game
            </button>
          </div>

          <canvas
            ref={canvasRef}
            width={360}
            height={320}
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            style={{
              width: '100%',
              height: '320px',
              borderRadius: '16px',
              display: 'block',
              cursor: 'ew-resize'
            }}
          />
        </div>
      )}
    </section>
  );
};
