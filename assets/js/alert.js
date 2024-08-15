document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const submitButton = document.getElementById('btn-submit');
    const modal = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Previne o comportamento padrão do botão de submit

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => {
            if (response.status === 401) {
                // Exibir o modal com a mensagem "Acesso negado"
                alertMessage.textContent = 'Acesso negado';
                modal.style.display = 'flex'; // Alterado para 'flex' para centralizar o modal

                // Ocultar o modal após 5 segundos
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 5000);
            } else {
                // Se necessário, trate outros status de resposta aqui
                console.log('Resposta recebida: ', response.status);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar a requisição:', error);
        });
    });
});
