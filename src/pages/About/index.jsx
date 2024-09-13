export default function About(){
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Sobre mim
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Me chamo Marcos Vinícius, sou graduado em Ciência da Computação na Universidade Estadual do Piauí (UESPI). A área 
            com a qual mais me identifico é a de desenvolvimento web, pois considero essencial a criação 
            de aplicativos que possam ser acessados facilmente nos mais variados dispositivos, e assim, 
            atendem a um número maior de possibilidades. Algumas das tecnologias que mais tenho estudado 
            e utilizado em projetos pessoais são: <i>Vue, React, JavaScript, Laravel, PHP,</i> entre outras. 
            Procuro uma oportunidade de trabalho em que eu possa colocar em prática os conhecimentos 
            obtidos ao longo da minha carreira de estudos, de forma que haja crescimento tanto pessoal 
            quanto profissional.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Tecnologia utilizadas 
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            A principal tecnologia utilizada neste projeto foi o <i>React</i>, pois é uma biblioteca essencial
            para a criação de aplicações web modernas conhecidas como <i>SPA (Single Page Application)</i>, estas
            permitem uma melhor usabilidade fornecendo ao usuário uma navegação mais fluída e sem a necessidade
            de recarregamento de toda página a cada requisição.
     
            Outra tecnologia utilizada foi o <i>Bootstrap</i>, esta foi bastante utilizada para estilizar a aplicação,
            assim como, para implementar a responsividade e utilização de componentes fornecidos pelo mesmo,
            por exemplo: <i>Navbar, Cards, Inputs,</i> entre outros.

            Também foi utilizado o <i>Redux</i> para gerenciar estados e facilitar a comunicação entre
            os componentes, principalmente no momento em que requisições são feitas, assim o mesmo permitiu
            armazenar os dados obtidos da <i>API</i> de forma global na aplicação 
            
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Dificuldades encontradas
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Não tive grandes dificuldades ao desenvolver o projeto, mas um ponto que pode ser citado foi uma dúvida
            que tive entre utilizar a biblioteca <i>React Bootsrap</i> ou usar <i>Bootstrap</i> na forma tradicional,
            acabei optando pela segunda opção, levando em conta que tenho mais familiaridade com a forma padrão
            do <i>Bootstrap</i>.

            Outra dúvida que tive foi se eu deveria componentizar mais a aplicação, mas acredito que 
            para o propósito deste sistema não é necessário, considerando que é uma aplicação pequena
            e não faria muito sentido criar componentes que fossem utilizados apenas uma única vez.

            Apenas tive um pouco de dificuldade ao implementar as requisições para a API, em alguns momentos
            obtive erros de processamento de dados, uma solução encontrada foi definir no cabeçalho
            da requisição explicitamente que o formato enviado era JSON: <code>"Content-Type": "application/json"</code> 
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            Sugestões
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Uma sugestão que faço é a implementação do método <i>delete</i> na API, assim como, os demais métodos
            para as rotas de cidades e estados, que atualmente só possuem o <i>get</i>, isso permitiria que os
            testes fossem feitos de forma mais completa. Outra melhoria que sugiro, é que seja implementado na API uma
            resposta correta para os erros na requisição para <code>/api/login/run</code>, considerando
            que a resposta obtida para o método <i>post</i> é sempre 200, embora devesse ser 400 e 401 em aguns casos.
          </div>
        </div>
      </div>
    </div>
  )
}