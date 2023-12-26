describe('CounterApp test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Visual validation', () => {
    cy.get('h1').should('contain.text', 'CounterApp')
    cy.get('h2').should('contain.text', '10')
    cy.get('button:contains("+1")').should('be.visible');
    cy.get('button:contains("Reset")').should('be.visible');
    cy.get('button:contains("-1")').should('be.visible');
  })

  it('Increment button functional validation', () => {
    cy.get('button:contains("+1")').click();
    cy.get('h2').should('contain.text', '11')
  })

  it('Decrement button functional validation', () => {
    cy.get('button:contains("-1")').click();
    cy.get('h2').should('contain.text', '9')
  })

  it('Reset button functional validation', () => {
    cy.get('button:contains("+1")').click();
    cy.get('h2').should('contain.text', '11')
    cy.get('button:contains("Reset")').click();
    cy.get('h2').should('contain.text', '10')
  })

  it('Decrement till 0 functional validation', () => {
    for (let index = 0; index < 10; index++) {
      cy.get('button:contains("-1")').click();
    }
    cy.get('h2').should('contain.text', '0')
  })

  it('Decrement/Increment buttons functional validation', () => {
    for (let index = 0; index < 11; index++) {
      cy.get('button:contains("-1")').click();
    }
    cy.get('h2').should('contain.text', '-1')

    for (let index = 0; index < 3; index++) {
      cy.get('button:contains("+1")').click();
    }
    cy.get('h2').should('contain.text', '2')
  })

  it('Randomly all buttons functional validation', () => {
    var randomPositiveIntForDecrement = Math.floor(Math.random() * 100) + 1;
    for (let index = 0; index < randomPositiveIntForDecrement; index++) {
      cy.get('button:contains("-1")').click();
    }
    cy.get('h2').should('contain.text', 10 - randomPositiveIntForDecrement)

    cy.get('h2').invoke('text').then((value) => {
      var randomPositiveIntForIncrement = Math.floor(Math.random() * 100) + 1;
      for (let index = 0; index < randomPositiveIntForIncrement; index++) {
        cy.get('button:contains("+1")').click();
      }
      cy.get('h2').should('contain.text', parseInt(value) + randomPositiveIntForIncrement)
    });

    cy.get('button:contains("Reset")').click();
    cy.get('h2').should('contain.text', '10')
  })
})