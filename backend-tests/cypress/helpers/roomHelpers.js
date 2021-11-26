//const faker = require('faker')

const ENDPOINT_GET_ROOMS = 'http://localhost:3000/api/rooms'
const ENDPOINT_POST_ROOM = 'http://localhost:3000/api/room/new'
const ENDPOINT_GET_ROOM = 'http://localhost:3000/api/room/'

function createRoom(cy){

    const payload = {
        
        "category": "double", 
        "number": 202, 
        "floor": 2, 
        "available": true, 
        "price": 2000,
        "features": ["penthouse"] 
    }
    return payload
}

function getAllRoomsRequest(cy){
    cy.authenticate().then((response =>{
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
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

function createRoomRequest(cy){
    cy.authenticate().then((response =>{

        let newRoom = createRoom()

        // POST request to create room 
        cy.request({
             method: "POST",
             url: ENDPOINT_POST_ROOM,
             headers: {
                 'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                 'Content-Type': 'application/json'
            },
            body:newRoom

        }).then((response =>{
             const responseAsString = JSON.stringify(response.body)
             expect(responseAsString).to.have.string(JSON.stringify(newRoom).slice(0,-1))
        }))   
    }))   
}

function deleteRoomRequest (cy){
    cy.authenticate().then((response =>{
        // GET request to fetch rooms
        cy.request({
            method: "GET",
            url: ENDPOINT_GET_ROOMS,
            headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
            },
        }).then((response =>{
        // DELETE request to remove last room    
            let lastId = response.body[response.body.length -1].id
                cy.request({
                method: "DELETE",
                url: ENDPOINT_GET_ROOM+lastId,
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
    }))
}

module.exports = {
    createRoom, 
    createRoomRequest,
    getAllRoomsRequest,
    deleteRoomRequest,
}