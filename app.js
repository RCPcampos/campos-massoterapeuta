const form = document.querySelector('#booking-form');
const nameField = document.querySelector('#nome');
const serviceField = document.querySelector('#servico');
const dateField = document.querySelector('#data');
const periodField = document.querySelector('#periodo');
const review = document.querySelector('#booking-review');
const reviewTitle = document.querySelector('#review-title');
const messagePreview = document.querySelector('#message-preview');
const sendLink = document.querySelector('#send-link');
const editRequest = document.querySelector('#edit-request');
const whatsapp = 'https://wa.me/5512988212348';

function updateMinimumDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  dateField.min = `${today.getFullYear()}-${month}-${day}`;
}

for (const link of document.querySelectorAll('[data-service]')) {
  const service = link.closest('.service').querySelector('summary').textContent.trim();
  serviceField.add(new Option(service, service));
  link.addEventListener('click', () => {
    serviceField.value = service;
    review.hidden = true;
    form.hidden = false;
  });
}

nameField.addEventListener('input', () => nameField.setCustomValidity(''));
dateField.addEventListener('focus', updateMinimumDate);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameField.value.trim();
  nameField.setCustomValidity(name ? '' : 'Digite seu nome.');
  updateMinimumDate();
  if (!form.reportValidity()) return;

  const lines = [
    'Olá, Luciana! Gostaria de solicitar um agendamento em Caraguatatuba.',
    '',
    `Nome: ${name}`,
    `Atendimento: ${serviceField.value}`,
  ];
  if (dateField.value) {
    const date = dateField.value.split('-').reverse().join('/');
    lines.push(`Data de preferência: ${date}`);
  }
  if (periodField.value) lines.push(`Período: ${periodField.value}`);
  lines.push('', 'Você pode me informar a disponibilidade?');

  const message = lines.join('\n');
  messagePreview.textContent = message;
  sendLink.href = `${whatsapp}?text=${encodeURIComponent(message)}`;
  form.hidden = true;
  review.hidden = false;
  reviewTitle.focus();
});

editRequest.addEventListener('click', () => {
  review.hidden = true;
  form.hidden = false;
  nameField.focus();
});

updateMinimumDate();
form.hidden = false;
