function createItem(request, response) {
    var itemName = request.getParameter('itemName');
    var subsidiary = request.getParameter('subsidiary');
    
    var itemRecord = nlapiCreateRecord('inventoryitem');
    itemRecord.setFieldValue('itemid', itemName);
    if (subsidiary) {
        itemRecord.setFieldValue('subsidiary', subsidiary);
        // Default is automatically selected when new record is created
    }

    // Adding inventory to the first location in the sublist
    nlapiSetLineItemValue('locationsList', 'quantityOnHand', 1, 100);
    itemRecord.commitLineItem('locationsList');
    var itemRecordInternalId = nlapiSubmitRecord( itemRecord, true);
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created an inventory item with internal id ' + itemRecordInternalId);
    response.write('Created an inventory item with internal id ' + itemRecordInternalId);
}
