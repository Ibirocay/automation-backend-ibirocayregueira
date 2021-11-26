const faker = require('faker')

const ENDPOINT_GET_CLIENTS = 'http://localhost:3000/api/clients'
const ENDPOINT_POST_CLIENT = 'http://localhost:3000/api/client/new'
const ENDPOINT_GET_CLIENT = 'http://localhost:3000/api/client/'

function createRandomClient(){

    const fakeFirstName = faker.name.firstName()
    const fakeLastName = faker.name.lastName()
    const fakeEmail = faker.internet.email()
    const fakePhone = faker.phone.phoneNumber()

    const payload = {
        "name":fakeFirstName + ' ' + fakeLastName,
        "email":fakeEmail,
        "telephone":fakePhone
    }
    return payload
}

function getRequestAllClientsAssertion (cy, name, email, telephone){
// GET request to fetch client
    cy.request({
    method: "GET",
    url: ENDPOINT_GET_CLIENTS,
    headers: {
        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
        'Content-Type': 'application/json'
    },
    }).then((response =>{
    const responseAsString = JSON.stringify(response)
    expect(responseAsString).to.have.string(name)
    expect(responseAsString).to.have.string(email)
    expect(responseAsString).to.have.string(telephone)

    cy.log(response.body)
    cy.log(response.body.length)

    }))
}

function getAllClientsRequest(cy){
    cy.authenticate().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_CLIENTS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response)
            cy.log(responseAsString)
        }))
    }))
}

function deleteRequestAfterGet (cy){
    // GET request to fetch client
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_CLIENTS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{

        let lastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: ENDPOINT_GET_CLIENT+lastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
            expect(responseAsString).to.have.string('true')
        }))
    }))    
}

function createClientRequest(cy){
    cy.authenticate().then((response =>{

        let fakeClient = createRandomClient()

        // POST request to create client 
        cy.request({
             method: "POST",
             url: ENDPOINT_POST_CLIENT,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:fakeClient

        }).then((response =>{
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeClient.name)
        }))

        getRequestAllClientsAssertion(cy, fakeClient.name, fakeClient.email, fakeClient.telephone)
         
    }))   
}

function createClientRequestAndDelete(cy){
    cy.authenticate().then((response =>{

        let fakeClient = createRandomClient()

        cy.request({
             method: "POST",
             url: ENDPOINT_POST_CLIENT,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:fakeClient

        }).then((response =>{
             const responseAsString = JSON.stringify(response)
             expect(responseAsString).to.have.string(fakeClient.name)
        }))

        deleteRequestAfterGet(cy)
         
    }))
    
}

module.exports = {
    createRandomClient, 
    createClientRequest,
    getAllClientsRequest,
    createClientRequestAndDelete,
}