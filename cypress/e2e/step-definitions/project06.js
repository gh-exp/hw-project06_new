const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor')

const Inventory = require('../../pages/Inventory')
const invent = new Inventory()

Given(/^the user is on "([^"]*)"$/, (url) => {
  cy.visit(url)
})

Then(/^the user should see the "([^"]*)" heading$/, (text) => {
  invent.getHeading().should('have.text', text)
})

Then(/^the user should see the table with the headers below$/, (dataTable) => {
  const arr = dataTable.rawTable.flat()

  invent.getTableHeader().each(($el, index) => {
    cy.wrap($el).should('contain', arr[index])
  })
})

Then(/^the user should see the table with the rows below$/, (dataTable) => {
  const rows = dataTable.rawTable

  invent.getAllTableRows().each(($row, i) => {
    rows[i].forEach((cell, j) => {
      cy.wrap($row).find('td').eq(j).should('contain', cell.trim())
    })
  })
})

Then(/^the user should see the "([^"]*)" button is enabled$/, (label) => {
  invent.getButtonByLabel(label).should('be.enabled')
})

Then(/^the user should see the "([^"]*)" text displayed$/, (text) => {
  invent.getTotalAmount().should('have.text', text)
})

When(/^the user clicks on the "([^"]*)" button$/, (label) => {
  invent.clickButtonByLabel(label)
})

Then(/^the user should see the "([^"]*)" modal with its heading$/, (title) => {
  invent.getModalTitle().should('have.text', title)
})

Then(/^the user should see the "([^"]*)" label$/, (label) => {
  invent.getModalLabelByLabel(label).should('be.visible')
})

Then(/^the user should see the "([^"]*)" input box is enabled$/, (label) => {
  invent.getModalInputByLabel(label).should('be.enabled')
})

Then(/^the user should not see the "([^"]*)" modal$/, () => {
  invent.getModalTitle().should('not.exist')
})

Then(/^the user enters the quantity as "([^"]*)"$/, (quantity) => {
  invent.getQuantityInput().type(quantity)
})

Then(/^the user enters the product as "([^"]*)"$/, (product) => {
  invent.getProductInput().type(product)
})

Then(/^the user enters the price as "([^"]*)"$/, (price) => {
  invent.getPriceInput().type(price)
})

Then(/^the user should see the table with the new row below$/, (dataTable) => {
  const row = dataTable.rawTable.flat()

  invent
    .getAllTableRows()
    .last()
    .find('td')
    .each(($el, i) => {
      cy.wrap($el).should('contain', row[i])
    })
})
