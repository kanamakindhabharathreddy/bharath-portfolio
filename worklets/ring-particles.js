// CSS Houdini PaintWorklet — draws animated ring of particles
if (typeof registerPaint !== 'undefined') {
  registerPaint('ring-particles', class {
    static get inputProperties() {
      return [
        '--ring-radius', 
        '--particle-count',
        '--animation-tick'
      ];
    }

    paint(ctx, size, props) {
      // Provide fallbacks if properties are not set
      const radius = parseFloat(props.get('--ring-radius').toString()) || 300;
      const count = parseInt(props.get('--particle-count').toString()) || 80;
      const tick = parseFloat(props.get('--animation-tick').toString()) || 0;
      
      const cx = size.width / 2;
      const cy = size.height / 2;
      
      // Draw particles in ring formation, animated by tick
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + tick * 0.01;
        const r = radius + Math.sin(tick * 0.05 + i) * 20;
        
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        
        const alpha = 0.3 + Math.sin(tick * 0.03 + i * 0.5) * 0.4;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(65, 105, 255, ${alpha})`;
        ctx.fill();
      }
    }
  });
}
