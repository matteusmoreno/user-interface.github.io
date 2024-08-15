const submit = document.getElementById('btn-submit');
const form = document.getElementById('login-form');

document.addEventListener('DOMContentLoaded', function() {

    submit.addEventListener('click', function(event) {
        event.preventDefault();

        // Obtenha os dados dos campos do formulário
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;

        // Converte os dados do formulário para JSON
        const jsonData = jsonFile(username, password);

        // Extrai os atributos de <form>
        const action = form.getAttribute('action');
        const method = form.getAttribute('method').toUpperCase(); // Garante que o método esteja em maiúsculas

        // Verifica se os campos obrigatórios estão preenchidos
        if (username && password && action && method) {
            makeRequest(action, jsonData, method).then(function(response) {
                if (response && response.status >= 400 && response.status <= 499) {
                    showModal('Acesso não autorizado');
                } else if (response && response.status >= 200 && response.status <= 299) {
                    // Armazena o token no cookie do navegador
                    document.cookie = `authToken=${response.token}; path=/;`;
                } else if (response && response.status >= 500 && response.status <= 599) {
                    showModal('Erro no servidor: ' + response.status);
                } else {
                    showModal('Erro desconhecido. Status code: ' + (response ? response.status : 'sem status'));
                }
            });
        } else {
            showModal("Erro");
        }
    });
});

function jsonFile(username, password) {
    // Cria um objeto com dados
    const formData = {
        username: username,
        password: password
    };

    // Converte o objeto para uma string JSON
    return JSON.stringify(formData);
}

function showModal(message) {
    const modal = document.getElementById('custom-alert');
    const progress = modal.querySelector('.progress');
    const textModal = document.getElementById('alert-message');

    textModal.textContent = message;
    modal.classList.add('show');

    // Tempo total para a barra de progresso (em milissegundos)
    const totalTime = 5000;

    // Atualiza a largura da barra de progresso a cada 100ms
    const interval = 100;
    let width = 100;
    const decrement = (interval / totalTime) * 100;

    const progressInterval = setInterval(() => {
        width -= decrement;
        if (width <= 0) {
            width = 0;
            clearInterval(progressInterval);
            // Remove a classe 'show' após o tempo total
            modal.classList.remove('show');
        }
        progress.style.width = width + '%';
    }, interval);

    // Remove a classe 'show' após o tempo total
    setTimeout(() => {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }, totalTime);
}

async function makeRequest(url, json, method) {
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: json // Envia os dados JSON no corpo da requisição
        });

        return response; // Retorna o objeto de resposta completo
    } catch (error) {
        if (error.response) {
            return error.response; // Retorna o objeto de resposta do erro
        } else if (error.request) {
            showModal('Erro na conexão ou no servidor.');
            return null; // Erro de rede
        } else {
            showModal('Erro:', error.message);
            return null; // Erro genérico
        }
    }
}
