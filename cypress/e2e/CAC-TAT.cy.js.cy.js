// Estrutura básica para a suite de testes ↓
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    // Visitando a URL diretamente do projeto CAC - TAT em cada teste (it) iniciado
    cy.visit('./src/index.html')
  })

  // Lesson 01 - Exercício ↓
  it('CT-001 → verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Lesson 02 - Exercício e Exercício extra 1 ↓
  it('CT-002 → preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', '10')
    
    cy.get('#firstName').type('Antonio Renan', { delay: 20})
    cy.get('#lastName').type('Oliveira Sarmento', { delay: 0})
    cy.get('#email').type('renan.teste@gmail.com', { delay: 0})
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')

    cy.tick(3000)
    
    cy.get('.success').should('not.be.visible')
  })

  // Lesson 02 - Exercício extra 2 ↓
  it('CT-003 →  exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    
    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
      
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  // Lesson 02 - Exercício extra 3 ↓
  it('CT-004 →  campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  // Lesson 02 - Exercício extra 4 e Lesson 05 - Exercício extra ↓
  it('CT-005 →  exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    
    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  // Lesson 02 - Exercício extra 5 ↓
  it('CT-006 → preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Antonio Renan')
      .should('have.value', 'Antonio Renan')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Oliveira Sarmento')
      .should('have.value', 'Oliveira Sarmento')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('renan.teste@gmail.com')
      .should('have.value', 'renan.teste@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11992515736')
      .should('have.value', '11992515736')
      .clear()
      .should('have.value', '')
  })

  // Lesson 02 - Exercício extra 6 ↓
  it('CT-007 → exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    
    cy.contains('button', 'Enviar').click()
      
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  // Lesson 02 - Exercício extra 7.1 ↓
  it('CT-008.1 → envia o formuário com sucesso usando um comando customizado 1.0', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })
  // Lesson 02 - Exercício extra 7.2 ↓
  it('CT-008.2 → envia o formuário com sucesso usando um comando customizado 2.0 recebendo um argumento', () => {
    const data = {
      firstName: 'Renata',
      lastName: 'Sarmento',
      email: 'renata.sarmento@gmail.com',
      text: 'Teste com dados da Renata'
    }
    cy.clock()

    cy.fillMandatoryFieldsAndSubmitTwo(data)

    cy.get('.success').should('be.visible')
    
    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  // Lesson 02 - Exercício extra 7.3 ↓
  it('CT-008.3 → envia o formuário com sucesso usando um comando customizado 3.0 com um valor padrão', () => {
    cy.clock()
    
    cy.fillMandatoryFieldsAndSubmitThree()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

// Lesson 02 - Exercício extra 8 ↓
  it('CT-009 → identifica o elemento com o cy.contains', () => {
    cy.clock()

    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail.com')
    cy.get('#open-text-area').type('a.')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
    
    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

  //  Lesson 03 - Exercício ↓
  it('CT-010 → seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  //  Lesson 03 - Exercício extra 1 ↓
  it('CT-011 → seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  //  Lesson 03 - Exercício extra 2 ↓
  it('CT-012 → seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  //  Lesson 04 - Exercício ↓
  it('CT-013 → marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //  Lesson 04 - Exercício extra ↓
  it('CT-014 → marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  // Lesson 05 - Exercício ↓
  it('CT-015 → marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  // Lesson 06 - Exercício ↓
  it('CT-016 → seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input[0].files[0].name),
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  // Lesson 06 - Exercício extra 1 ↓
  it('CT-017 → seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  // Lesson 06 - Exercício extra 2 ↓
  it('CT-018 → seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
      .as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })  
  
  })

  // Lesson 07 - Exercício ↓
  it('CT-019 → verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  // Lesson 07 - Exercício extra 1 ↓
  it('CT-020 → acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  // Lesson 07 - Exercício extra 2 - Desafio ↓
  // Foi criado um novo arquivo chamado "privacy.cy.js" na pasta e2e


  // Lesson 08 ↓  
  // Foram criados dois scripts no arquivo package.json. 
  // Um que abre o Cypress Runner simulando um dispositivo com 410 pixels de largura e 860 pixels de altura.
  // Outro que roda os testes em modo headless, simulando um dispositivo com 410 pixels de largura e 860 pixels de altura.
  // Também foi adicionado a propriedade video: true ao arquivo de configurações do Cypress (cypress.config.js), logo abaixo da propriedade e2e.


  // Lesson 12 - Exercício
  // Foram adicionadas as funções cy.clock() e cy.tick() nos testes que de validação manipulando o tempo acelerando a velocidade do teste.
  // Com a funcinalidade cy.clock(), você pode "congelar" 🧊 o relógio do navegador.
  // E com a funcionalidade cy.tick(), você pode avançar no tempo. 🕒

  // Lesson 12 - Exercício extra 2

  it('CT-023 → exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  
  // Lesson 12 - Exercício extra 3

  it('CT-023 → preenche o campo da área de texto usando o comando invoke.', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Um texto qualquer')
      .should('have.value', 'Um texto qualquer')
  })

// Lesson 12 - Exercício extra 4
  it('CT-024 → faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')   
      .its('body')  
      .should('include', 'CAC TAT') 
  })

  it('CT-025 → encontra o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu ❤️ Gatos!')
  })
})