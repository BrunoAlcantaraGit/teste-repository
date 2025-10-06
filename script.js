(function(){
  const btn = document.getElementById('surpriseBtn');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popupText');
  const closeBtn = document.getElementById('closeBtn');
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext && canvas.getContext('2d');

  function resizeCanvas(){ 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let confettiPieces = [];
  function createConfetti(x){
    for(let i=0;i<80;i++){
      confettiPieces.push({
        x: x || Math.random()*canvas.width,
        y: -10 - Math.random()*200,
        size: 6 + Math.random()*10,
        speedY: 1 + Math.random()*4,
        speedX: -3 + Math.random()*6,
        rot: Math.random()*360,
        rotSpeed: -6 + Math.random()*12,
        color: ['#ff4d86','#ffd166','#6bf0c3','#8ea2ff','#ffd1e3'][Math.floor(Math.random()*5)]
      });
    }
  }

  function updateConfetti(){
    if(!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=confettiPieces.length-1;i>=0;i--){
      const p = confettiPieces[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rot += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
      if(p.y > canvas.height + 40) confettiPieces.splice(i,1);
    }
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();

  // Abrir popup
  btn.addEventListener('click', ()=>{
    const texto = '🎉 Feliz aniversário, Marília! 🎂 Desejo toda felicidade e sucesso do mundo inteiro, e que nossos caminhas estejam juntos para sempres, te amo!❤❤';
    popupText.textContent = texto;
    popup.classList.add('active');
    createConfetti(window.innerWidth/2);
  });

  // Fechar popup
  closeBtn.addEventListener('click', ()=>{
    popup.classList.remove('active');
  });

  // ESC fecha popup
  window.addEventListener('keydown', (e)=>{ 
    if(e.key === 'Escape'){ 
      popup.classList.remove('active'); 
    }
  });
})();
