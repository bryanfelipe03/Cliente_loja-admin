// ==========================================
// 1. NAVEGAÇÃO E SIDEBAR
// ==========================================

// Abrir e fechar menu lateral no celular
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Trocar entre as telas (Dashboard, Produtos, Clientes)
function showSection(sectionId, element) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Mostra a seção desejada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Atualiza o visual dos botões no menu lateral
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    // Atualiza o título no topo da página
    const titles = { 
        'dashboard': 'Visão Geral', 
        'produtos': 'Gerenciamento de Estoque', 
        'clientes': 'Base de Clientes' 
    };
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.innerText = titles[sectionId] || 'Painel';
    }

    // Se estiver no celular, fecha o menu automaticamente após clicar
    if (window.innerWidth < 992) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    }
}

// ==========================================
// 2. MODAL DE PRODUTOS (A MINI TELA)
// ==========================================

function openProductModal(mode = 'new') {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    if (modal) {
        modal.style.display = 'flex';
        
        if (mode === 'edit') {
            modalTitle.innerText = 'Editar Produto';
            // Aqui seu amigo do back-end vai preencher os dados do produto para editar
        } else {
            modalTitle.innerText = 'Novo Produto';
            if (form) form.reset(); // Limpa o formulário para um novo cadastro
        }
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fecha o modal se o usuário clicar no fundo escuro (fora da caixa branca)
window.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
});

// ==========================================
// 3. GRÁFICOS (CHART.JS)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderCharts();
});

function renderCharts() {
    const salesCanvas = document.getElementById('mainSalesChart');
    const categoryCanvas = document.getElementById('categoryChart');

    if (salesCanvas) {
        const ctxSales = salesCanvas.getContext('2d');
        new Chart(ctxSales, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [1200, 1900, 3100, 2500, 2200, 4800, 3900],
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    if (categoryCanvas) {
        const ctxCat = categoryCanvas.getContext('2d');
        new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: ['Feminino', 'Masculino'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: ['#d4af37', '#0d0d0d']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}
function addColorTag() {
    const colorPicker = document.getElementById('productColor');
    const colorHex = document.getElementById('colorHex');
    const display = document.getElementById('selectedColors');
    
    // Usa o valor do input de cor ou o texto digitado
    const selectedColor = colorHex.value || colorPicker.value;

    if (selectedColor) {
        const tag = document.createElement('div');
        tag.className = 'color-tag';
        tag.innerHTML = `
            <div class="color-preview" style="background: ${selectedColor}"></div>
            <span>${selectedColor}</span>
            <span class="remove-color" onclick="this.parentElement.remove()">×</span>
        `;
        display.appendChild(tag);
        colorHex.value = ''; // Limpa o campo
    }
}

