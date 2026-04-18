function initJoinModal() {
  const modal = document.getElementById('joinModal');
  if (!modal) return;
  
  const modalClose = document.getElementById('joinModalClose');
  const form = document.getElementById('joinForm');
  const successMsg = document.getElementById('joinSuccessMsg');
  const closeSuccessBtn = document.getElementById('joinCloseSuccessBtn');

  document.querySelectorAll('.join-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose?.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  modal.querySelector('.modal-backdrop')?.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  closeSuccessBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.classList.add('hidden');
        successMsg.classList.add('active');
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  });
}
