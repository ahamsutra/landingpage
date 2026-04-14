(function(){

  /* CUSTOM CURSOR */
  const dot=document.getElementById('cd'),ring=document.getElementById('cr');
  let rx=0,ry=0,mx=0,my=0;

  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function trackRing(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(trackRing);})();

  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{dot.style.width='12px';dot.style.height='12px';ring.style.width='64px';ring.style.height='64px';ring.style.opacity='.3';});
    el.addEventListener('mouseleave',()=>{dot.style.width='8px';dot.style.height='8px';ring.style.width='40px';ring.style.height='40px';ring.style.opacity='.5';});
  });

  /* SCROLL PROGRESS */
  const spbar=document.getElementById('sp');
  window.addEventListener('scroll',()=>{const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);spbar.style.width=(pct*100)+'%';},{passive:true});

  /* FORM HANDLING */
  const form=document.getElementById('contactForm');
  const successMsg=document.getElementById('successMsg');
  const submitBtn=form.querySelector('.submit-btn');

  form.addEventListener('submit',async function(e){
    e.preventDefault();
    
    submitBtn.disabled=true;
    submitBtn.querySelector('span').textContent='Sending...';
    
    const formData=new FormData(form);
    
    try{
      const response=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        body:formData
      });
      
      if(response.ok){
        form.style.display='none';
        successMsg.classList.add('show');
        window.scrollTo({top:0,behavior:'smooth'});
      } else {
        throw new Error('Submission failed');
      }
    } catch(error){
      submitBtn.disabled=false;
      submitBtn.querySelector('span').textContent='Send the Thread';
      alert('Something went wrong. Please try again.');
    }
  });

  /* INPUT ANIMATION - Floating labels effect */
  const inputs=document.querySelectorAll('.form-group input,.form-group textarea,.form-group select');
  inputs.forEach(input=>{
    input.addEventListener('focus',()=>{input.parentElement.classList.add('focused');});
    input.addEventListener('blur',()=>{if(!input.value)input.parentElement.classList.remove('focused');});
  });

})();
