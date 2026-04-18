function initContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  
  const modalClose = document.getElementById('modalClose');
  const modalForm = document.getElementById('contactFormModal');
  const successMsgModal = document.getElementById('successMsgModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  document.querySelectorAll('.spark-trigger').forEach(btn => {
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

  modalForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    try {
      const response = await fetch(modalForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        modalForm.classList.add('hidden');
        successMsgModal.classList.add('active');
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  });
}
