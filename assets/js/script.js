/**
 * Verifica se os campos de entrada (inputs) têm conteúdo e ajusta a posição do rótulo (label).
 * 
 * Esta função percorre todos os elementos `input` na página. Se um `input` contiver algum
 * conteúdo, a função adiciona a classe `up` ao `label` associado, fazendo com que o rótulo 
 * suba e se ajuste ao conteúdo. Se o campo estiver vazio, a classe `up` é removida, 
 * retornando o rótulo à sua posição original.
 * 
 * @function withContent
 */
function withContent() {
    const inputs = document.querySelectorAll('input'); // Seleciona todos os elementos <input> na página

    inputs.forEach(input => {
        const label = input.nextElementSibling; // Seleciona o próximo elemento irmão, que é o <label>

        if (input.value !== '') {
            label.classList.add('up'); // Adiciona a classe 'up' ao label se o input tiver conteúdo
        } else {
            label.classList.remove('up'); // Remove a classe 'up' do label se o input estiver vazio
        }
    });
}

/**
 * Limpa todos os campos de entrada ao carregar a página.
 * 
 * Esta função é executada automaticamente ao carregar a página, garantindo que os campos de entrada
 * do formulário estejam vazios e os rótulos (labels) estejam na posição inicial.
 * 
 * @function clearInputs
 */
function clearInputs() {
    const inputs = document.querySelectorAll('input'); // Seleciona todos os elementos <input> na página

    inputs.forEach(input => {
        input.value = ''; // Limpa o valor do input
        const label = input.nextElementSibling; // Seleciona o próximo elemento irmão, que é o <label>
        label.classList.remove('up'); // Remove a classe 'up' para resetar a posição do label
    });
}

/**
 * Adiciona eventos ao campo de senha e botão de visibilidade ao carregar o DOM.
 * 
 * Esta função é executada automaticamente quando o conteúdo do DOM foi completamente carregado.
 * Ela seleciona o campo de senha, o botão de alternância de visibilidade da senha e o ícone do olho.
 * Ao clicar no botão de alternância, a função alterna entre mostrar e ocultar a senha, 
 * alterando o tipo do campo de senha e o ícone correspondente.
 * 
 * @event DOMContentLoaded - Executa a função quando o conteúdo do DOM foi completamente carregado.
 * @listens click - Alterna entre mostrar e ocultar a senha ao clicar no botão de visibilidade.
 * 
 * @global
 */
document.addEventListener('DOMContentLoaded', function() {
    /** 
     * @type {HTMLInputElement} 
     * @description Campo de input para a senha.
     */
    const passwordInput = document.getElementById('password');

    /** 
     * @type {HTMLElement} 
     * @description Botão que permite alternar a visibilidade da senha.
     */
    const togglePassword = document.getElementById('toggle-password');

    /** 
     * @type {HTMLElement} 
     * @description Ícone de olho para mostrar/ocultar a senha.
     */
    const eyeIcon = document.getElementById('eye-icon');

    // Adiciona um evento ao botão para alternar a visibilidade da senha
    togglePassword.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.setAttribute('name', 'eye-off-outline'); // Muda para o ícone de "ocultar senha"
        } else {
            passwordInput.type = 'password';
            eyeIcon.setAttribute('name', 'eye-outline'); // Muda para o ícone de "mostrar senha"
        }
    });
});

/**
 * Limpa todos os campos de input ao carregar a página ou ao retornar para ela.
 * 
 * Esta função é executada automaticamente ao carregar a página e também
 * quando o usuário volta para a página usando o botão de "Voltar" do navegador.
 * Ela seleciona todos os elementos <input> no documento e redefine seus valores para vazio.
 * 
 * @function clearInputs
 */
function clearInputs() {
    // Seleciona todos os elementos <input> na página
    const inputs = document.querySelectorAll('input');

    // Percorre todos os inputs e redefine seus valores
    inputs.forEach(input => {
        input.value = ''; // Limpa o valor do input
    });
}

// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', clearInputs);

// Executa a função quando o usuário retorna à página
window.addEventListener('pageshow', clearInputs);
