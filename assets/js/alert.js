/**
 * Manipula o evento de envio do formulário de login.
 * 
 * Esta função é acionada quando o formulário com o ID 'login-form' é submetido. 
 * Ela previne o comportamento padrão de envio do formulário, coleta os valores 
 * dos campos de nome de usuário e senha, e realiza uma requisição POST para o 
 * servidor. Dependendo da resposta do servidor, exibe mensagens de alerta e uma 
 * barra de progresso no modal. A barra de progresso diminui de forma contínua por 
 * 5 segundos em caso de erro de autenticação.
 * 
 * @param {Event} event - O evento de envio do formulário.
 */
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Coleta os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Envia uma requisição POST para o servidor com as credenciais
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    // Obtém os elementos necessários para exibir o alerta e a barra de progresso
    const alertMessage = document.getElementById('alert-message');
    const customAlert = document.querySelector('.modal');
    const progressBar = document.createElement('div');
    const progress = document.createElement('div');

    progressBar.classList.add('progress-bar');
    progress.classList.add('progress');
    progressBar.appendChild(progress);

    // Adiciona a progressBar ao fundo do modal
    customAlert.appendChild(progressBar);

    // Verifica o status da resposta para exibir o alerta apropriado
    if (response.status === 401) {
        alertMessage.textContent = 'Acesso não permitido';
        customAlert.classList.add('show');

        // Inicia a linha de progresso com diminuição contínua
        let progressWidth = 100; // Começa com a largura total
        const duration = 5000; // Tempo total em milissegundos (5 segundos)
        const stepTime = 10; // Intervalo de tempo entre atualizações (em milissegundos)
        const stepWidth = (100 / duration) * stepTime; // Quantidade de largura a ser reduzida a cada atualização

        const interval = setInterval(() => {
            progressWidth -= stepWidth;
            if (progressWidth <= 0) {
                progressWidth = 0;
                clearInterval(interval);
                setTimeout(() => {
                    customAlert.classList.remove('show');
                    customAlert.removeChild(progressBar);
                }, 500); // Tempo para garantir que a transição de saída foi concluída
            }
            progress.style.width = `${progressWidth}%`;
        }, stepTime); // Atualiza a cada `stepTime` milissegundos

    } else if (response.status === 200) {
        const result = await response.json();
        alertMessage.textContent = result.message;
        customAlert.classList.add('show');
    }

    // Configura o botão de fechamento do modal
    document.querySelector('.close-btn').onclick = function() {
        customAlert.classList.remove('show');
        setTimeout(() => {
            customAlert.removeChild(progressBar);
        }, 500);
    };
});
