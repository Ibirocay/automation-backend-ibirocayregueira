/// <reference types="cypress" />

import * as clientHelpers from '../helpers/clientHelpers'
import * as roomHelpers from '../helpers/roomHelpers'
import * as billHelpers from '../helpers/billHelpers'

  describe('testing auth', function(){

    /*it('Create a new client', function(){
        clientHelpers.createClientRequest(cy)
    })

    it('Get all clients request', function(){
        clientHelpers.getAllClientsRequest(cy)
    })

    it('Create a client and delete it', function(){
        clientHelpers.createClientRequestAndDelete(cy)
    })
    */

    // My testcases

    it('Get all rooms request', function(){
        roomHelpers.getAllRoomsRequest(cy)
    })

    it('Create a new room request', function(){
        roomHelpers.createRoomRequest(cy)
    })

    it('Delete room request', function(){
        roomHelpers.deleteRoomRequest(cy)
    })

    it('Get all bills request', function(){
        billHelpers.getAllBillsRequest(cy)
    })
/*
    it('Create a new bill request', function(){
        billHelpers.createBillRequest(cy)
    })

    it('Update new bill request', function(){
        billHelpers.updateBillRequest(cy)
    })

    it('Delete bill request', function(){
        billHelpers.deleteBillRequest(cy)
    })
*/
    it('Create and Delete bill request', function(){
        billHelpers.createDeleteBillRequest(cy)
    })

    it.only('Create, Update and Delete bill request', function(){
        billHelpers.createUpdateDeleteBillRequest(cy)
    })
  })