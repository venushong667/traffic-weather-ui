describe('Traffic', () => {
    it('should get traffic location list and click to show traffic image', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')
        
        cy.get('div').contains('Locations')
        cy.intercept('/api/weather/*').as('getTraffic')
        
        cy.wait(3000)
        
        // Get location elem
        cy.get("#row>div").should('have.class', 'cursor-pointer').eq(0).as('locationRow')

        // CLick location
        cy.get('@locationRow').click()
        
        // Show traffic image from API
        cy.get("#camera-image>img").should('have.attr', 'srcset').and('match', /https:\/\/images.data.gov.sg\/api.*/)
   
    })
})

describe('Weather', () => {
    
    it('should click location to show current weather', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')
        
        cy.get('div').contains('Locations')
        cy.intercept('/api/weather/*').as('getTraffic')
        
        cy.wait(3000)
        
        // Get location elem
        cy.get("#row>div").should('have.class', 'cursor-pointer').eq(0).as('locationRow')
        
        // CLick location
        cy.get('@locationRow').click()
        
        cy.wait(3000)

        // Show current weather
        cy.get("#current-weather img").should('have.attr', 'src').and('match', /weather.*/)
   
    })

    it('should display today forecast', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')
        
        cy.get('div').contains('Locations')
        cy.intercept('/api/weather/*').as('getTraffic')
        
        cy.wait(3000)
        
        // Show 3 periods of weather
        cy.get("#today-weather img").should('have.length', 3).should('have.attr', 'src').and('match', /weather.*/)

        // Show observations data such as temperature, humidity
        cy.get("#today-weather #observation").should('have.length', 4)

    })

    it('should display 4-day forecast', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/')
        
        cy.get('div').contains('Locations')
        cy.intercept('/api/weather/*').as('getTraffic')
        
        cy.wait(3000)
        
        // Show 4-day forecast grid
        cy.get("#forecast-weather img").should('have.length', 4).should('have.attr', 'src').and('match', /weather.*/)
    })
})
