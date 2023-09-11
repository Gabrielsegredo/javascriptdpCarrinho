//criando um objeto com as informações, cada informação recebe um valor seja numerico ou string

const produtos = [
    {

    id: "1",
    nome: 'Gabriel Gomes',
    prof: 'Kelly',
    preco_de: 1500,
    preco_por: 150,
    descricao: 'O melhor que ta tendo por ai ',
    imagem: 'assets/1.png'
    },
    {

    id: '2',
    nome: 'caixa misteriosa',
    prof: 'Kelly',
    preco_de: 2750,
    preco_por: 360,
    descricao: 'compre e Descubra a sua surpresa',
    imagem: 'assets/3.png'
    }
];



    function renderizarProdutos() {
    //Declara uma variavel para armazenar o HTML gerado
    let html = '';

    //Itera sobre o array de produtos
    for (let i = 0; i < produtos.length; i++) {

    //chama a função 'criarProduto'para gerar o HTML para um unico produto
    html += criaProduto(produtos[i], i);
    }

    //ira retornar html
    return html;
}


   //a função criarProduto ira interagir com os indices  do array do produto
   function criaProduto(produto, index) {

    //cria elentos html utilizando a interpolação do array junto com o produtos
    return `
        <div class="curso">
            <img class="inicio" src="${produto.imagem}" />
            <div class="curso-info">
                <h4>${produto.nome}</h4>
                <p>${produto.prof}</p>
                <p>${produto.descricao}</p>
            </div>
            <div class="curso-preco">
                <span class="preco-de">R$${produto.preco_de}</span>
                <span class="preco-por">R$${produto.preco_por}</span>
                <button class="btn-add" data-index="${index}">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}

  //chamado o seletor CSS do #container
  const container = document.querySelector('#container');

  //O Container ira imprir a função 'redenrizarProdutos'
  container.innerHTML = renderizarProdutos();

  //Cria um objeto para receber valores 
  const carrinhoItens = {};

  //o objeto produtoId ira começar interagir com o carrinhoItens
  function renderizarCarrinho() {
    let html = '';
    for (let produtoId in carrinhoItens) {
        html += criarItemCarrinho(carrinhoItens[produtoId]);
    }
    document.querySelector('.carrinho_itens').innerHTML = html;
}

  //como o parametro 'produto' essa função ira criar elementos do HTML
  function criarItemCarrinho(produto) {
    return `
        <div class="carrinho_compra">
            <h4>${produto.nome}</h4>
            <p>Preço unidade: R$${produto.preco_por}</p>
            <p>Quantidade: ${produto.preco_de}</p>
            <p>Valor: R$${produto.preco_por * produto.preco_de}</p>
            <button data-produto-id="${produto.id}" class="btn-remove">Remover</button>
        </div>
    `;
}

  //Percorre o objeto carrinhoItens que ira se multipicar com 'preco_por' por 'preco_de'
  function criarCarrinhoTotal() {
    let total = 0;
    for (let produtoId in carrinhoItens) {
        total += carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].preco_de;
    }
    document.querySelector('.carrinho_total').innerHTML = `
        <h4>Total: <strong>R$${total.toFixed(2)}</strong></h4>
        <a href="#" target="_blank">
            <ion-icon name="card-outline"></ion-icon>
            <strong>Comprar agora</strong>
        </a>
    `;
}

  // Verifica se o produto existe no carrinho. se não ira interajir com o carrinhoItens
function adicionarNoCarrinho(produto) {
    if (!carrinhoItens[produto.id]) {
    carrinhoItens[produto.id] = { ...produto, quantidade: 0 };
    }

    //else  interaji com o carrinhoItes adicionando mais um
    carrinhoItens[produto.id].quantidade++;
    renderizarCarrinho();
    criarCarrinhoTotal();
}

    document.body.addEventListener('click', function (event) {

    //obtendo o elemento HTML que chamou um evento
    const elemento = event.target;

    //se contem a classe btn-add ira adicionar o no carrinho
    if (elemento.classList.contains('btn-add')) {
        const index = parseInt(elemento.getAttribute('data-index'), 10);
        const produto = produtos[index];
        adicionarNoCarrinho(produto);
    }

    //se contem a classe btn-remove ira  o produto
    if (elemento.classList.contains('btn-remove')) {
        const produtoId = elemento.getAttribute('data-produto-id');
        if (carrinhoItens[produtoId].quantidade <= 1) {
            //ira deletar o produtoId
            delete carrinhoItens[produtoId];
        } else {
            //ira diminuir a quantidade 
            carrinhoItens[produtoId].quantidade--;
        }
        renderizarCarrinho();
        criarCarrinhoTotal();
    }
});