import confetti from 'canvas-confetti';

export function triggerFlowerShower() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Marigold Orange, Yellow, Red, Pink Festive Colors
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#EAB308', '#CA8A04', '#EF4444', '#EC4899']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#F97316', '#FACC15', '#DC2626']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FEF08A', '#FEE2E2', '#FFEDD5']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#EAB308', '#F97316']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#EF4444', '#F43F5E']
  });
}
