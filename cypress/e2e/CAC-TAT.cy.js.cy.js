describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('CT-001 → verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('CT-002 → preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', '10')
    cy.get('#firstName').type('Antonio Renan', { delay: 20})
    cy.get('#lastName').type('Oliveira Sarmento', { delay: 0})
    cy.get('#email').type('renan.teste@gmail.com', { delay: 0})
    cy.get('#open-text-area').type('Gostaria de expressar minha sincera gratidão por todo o apoio e dedicação. Foi uma experiência incrível, e fiquei muito impressionado com a maneira como as coisas foram conduzidas. Cada detalhe, cada conversa, e até os momentos mais desafiadores, fizeram toda a diferença e me ajudaram a crescer. Agradeço imensamente pelo tempo e esforço investidos em mim, e por fazerem dessa jornada algo tão significativo. Espero poder retribuir de alguma forma e continuar aprendendo com todos vocês. Muito obrigado!', { delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })

  it('CT-003 →  exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
      
    cy.get('.error').should('be.visible')
  })

  it('CT-004 →  campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('CT-005 →  exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Antonio Renan')
    cy.get('#lastName').type('Oliveira Sarmento')
    cy.get('#email').type('renan.teste@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

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
})