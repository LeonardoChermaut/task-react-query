<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Task_Manager__React_Query_0"></a>Task Manager - React Query</h1>
<p class="has-line-data" data-line-start="2" data-line-end="3">Aplicação para criação e gerenciamento de tarefas com filtros por status e prioridade. Utiliza React com TypeScript, React Query para manipulação assíncrona de dados, TailwindCSS para o design e json-server como API REST fake.</p>
<h2 class="code-line" data-line-start=4 data-line-end=5 ><a id="Funcionalidades_4"></a>Funcionalidades</h2>
<ul>
<li class="has-line-data" data-line-start="6" data-line-end="7">Criar, editar e excluir tarefas</li>
<li class="has-line-data" data-line-start="7" data-line-end="8">Filtro por status (pendente, em progresso, concluída)</li>
<li class="has-line-data" data-line-start="8" data-line-end="9">Filtro por prioridade (alta, média, baixa)</li>
<li class="has-line-data" data-line-start="9" data-line-end="10">Persistência local com json-server</li>
<li class="has-line-data" data-line-start="10" data-line-end="12">Interface limpa, responsiva e moderna</li>
</ul>
<h2 class="code-line" data-line-start=12 data-line-end=13 ><a id="Como_rodar_o_projeto_12"></a>Como rodar o projeto</h2>
<ol>
<li class="has-line-data" data-line-start="14" data-line-end="16">Instale as dependências:</li>
</ol>
<pre><code class="has-line-data" data-line-start="17" data-line-end="19" class="language-bash">yarn
</code></pre>
<p class="has-line-data" data-line-start="20" data-line-end="21">Inicie o ambiente de desenvolvimento:</p>
<pre><code class="has-line-data" data-line-start="23" data-line-end="25">yarn dev
</code></pre>
<p class="has-line-data" data-line-start="25" data-line-end="27">A aplicação estará disponível em:<br>
<code>http://localhost:5173/</code></p>
<p class="has-line-data" data-line-start="28" data-line-end="30">O servidor fake da API (json-server) estará rodando em:<br>
<code>http://localhost:3001/tasks</code></p>
<p class="has-line-data" data-line-start="31" data-line-end="37">Estrutura do Projeto<br>
src/components/: componentes reutilizáveis (formulário, item, lista)<br>
src/shared/mock/: arquivo db.json usado pela API<br>
src/shared/hook/: hooks personalizados com React Query<br>
src/shared/service/: comunicação com o json-server<br>
src/shared/interface/: interfaces TypeScript</p>
