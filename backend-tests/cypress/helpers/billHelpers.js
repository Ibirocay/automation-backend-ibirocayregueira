//const faker = require('faker')

const ENDPOINT_GET_BILLS = 'http://localhost:3000/api/bills'
const ENDPOINT_POST_BILL = 'http://localhost:3000/api/bill/new'
const ENDPOINT_GET_BILL = 'http://localhost:3000/api/bill/'

function createBill(cy){

    const fakeAmount = Math.floor(Math.random() * 10000)
    const randomBool = Math.random() > 0.5 ? true : false;

    const payload = {
         
        "value": fakeAmount,
        "paid": randomBool    
    }
    return payload
}

function updateBill(cy, id, created){

    const fakeAmount = Math.floor(Math.random() * 10000)
    const randomBool = Math.random() > 0.5 ? true : false;

    const payload = {
         
        "id": 2, 
        //"id": id, - FAILED! Attempted this solution but kept generating error
        "created": 2021-11-26,
        //"created": created, - FAILED! Attempted this solution but kept generating error
        "value": fakeAmount, 
        "paid": randomBool    
        
    }
    return payload
}


function getRequestAllBillsAssertion (cy, value, paid){
        // GET request to fetch bills
    cy.request({
        method: "GET",
        url: ENDPOINT_GET_BILLS,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
    }).then((response =>{
        const responseAsString = JSON.stringify(response.body)
        expect(responseAsString).to.have.string(value)
        expect(responseAsString).to.have.string(paid)
    
    }))
}

function getAllBillsRequest(cy){
    cy.authenticate().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
        }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            cy.log(responseAsString)
        }))
    }))
}

function createBillRequest(cy){
    cy.authenticate().then((response =>{

        let newBill = createBill()

        // POST request to create bill 
        cy.request({
             method: "POST",
             url: ENDPOINT_POST_BILL,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:newBill

        }).then((response =>{
             const responseAsString = JSON.stringify(response.body)
             expect(responseAsString).to.have.string(JSON.stringify(newBill))
        })) 
        
        getRequestAllBillsAssertion(cy, newBill.value, newBill.paid)
    }))   
}


function updateBillRequest(cy){
    cy.authenticate().then((response =>{

        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
        }).then((response =>{   
            
            let lastId = response.body[response.body.length -1].id
            let upDate = response.body[response.body.length -1].created
            let updatedBill = updateBill(lastId, upDate)

            cy.request({
                method: "PUT",
                url: ENDPOINT_GET_BILL +lastId,
                headers: {
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
               },
               body:updatedBill
   
           }).then((response =>{
                const responseAsString = JSON.stringify(response.body)
                expect(responseAsString).to.have.string(JSON.stringify(updatedBill).slice(0,-1))
           })) 
           
        })) 
    }))   
}

function deleteBillRequest (cy){
    cy.authenticate().then((response =>{
        // GET request to fetch bills
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_BILLS,
            headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
        }).then((response =>{
        // DELETE request to remove last bill    
            let lastId = response.body[response.body.length -1].id

                cy.request({
                method: "DELETE",
                url: ENDPOINT_GET_BILL +lastId,
                headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                },
            }).then((response =>{
            const responseAsString = JSON.stringify(response.body)
            expect(responseAsString).to.have.string('true')
            }))
        }))
    }))
}

function createDeleteBillRequest(cy){
    cy.authenticate().then((response =>{

        let fakeBill = createBill()

        cy.request({
             method: "POST",
             url: ENDPOINT_POST_BILL,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:fakeBill

        }).then((response =>{
             const responseAsString = JSON.stringify(response.body)
             expect(responseAsString).to.have.string(fakeBill.value)
        }))

        deleteBillRequest(cy)
         
    }))
    
}

function createUpdateDeleteBillRequest(cy){
    cy.authenticate().then((response =>{

        let fakeBill = createBill()

        cy.request({
             method: "POST",
             url: ENDPOINT_POST_BILL,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:fakeBill

        }).then((response =>{
             const responseAsString = JSON.stringify(response.body)
             expect(responseAsString).to.have.string(fakeBill.value)
        }))

        updateBillRequest(cy)
        deleteBillRequest(cy)
         
    }))
    
}

module.exports = {
    createBill, 
    createBillRequest,
    updateBillRequest,
    getAllBillsRequest,
    deleteBillRequest,
    createDeleteBillRequest,
    createUpdateDeleteBillRequest
}