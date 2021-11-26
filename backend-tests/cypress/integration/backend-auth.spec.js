/// <reference types="cypress" />

import * as roomHelpers from '../helpers/roomHelpers'
import * as billHelpers from '../helpers/billHelpers'

  describe('testing auth', function(){

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

    it('Create and Delete bill request', function(){
        billHelpers.createDeleteBillRequest(cy)
    })

    it('Create, Update and Delete bill request', function(){
        billHelpers.createUpdateDeleteBillRequest(cy)
    })
  })