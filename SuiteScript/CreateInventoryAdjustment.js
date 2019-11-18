function createItemAdjustment(request, response) {
    var itemId = request.getParameter('item');
    var locationId = request.getParameter('location');
    var quantityToAdd = request.getParameter('quantity');
    if (itemId && locationId && quantityToAdd) {
        var subsidiary = request.getParameter('subsidiary');
        var adjustmentAccount = request.getParameter('account');
        var adjustmentRecord = nlapiCreateRecord('inventoryadjustment');
        if (subsidiary) {
            adjustmentRecord.setFieldValue('subsidiary', subsidiary);
        }
        else {
            // Assigned selected default subsidiary
            adjustmentRecord.setFieldValue('subsidiary', 3);
        }
        if (adjustmentAccount) {
            adjustmentRecord.setFieldValue('account', adjustmentAccount);
        }
        else {
            // Assigned account with internal id 25 as default adjustment account
            adjustmentRecord.setFieldValue('account', 25);
        }
        adjustmentRecord.selectNewLineItem('inventory');
        adjustmentRecord.setCurrentLineItemValue('inventory', 'item', itemId);
        adjustmentRecord.setCurrentLineItemValue('inventory', 'location', locationId);
        adjustmentRecord.setCurrentLineItemValue('inventory', 'adjustqtyby', quantityToAdd);
        
        adjustmentRecord.commitLineItem('inventory');
        var adjustmentRecordInternalId = nlapiSubmitRecord( adjustmentRecord );
        nlapiLogExecution('DEBUG', 'SUCCESS', 'Created an inventory item adjustment with internal id ' + adjustmentRecordInternalId);
        response.write('Created an inventory item adjustment with internal id ' + adjustmentRecordInternalId);
    }
    else {
        nlapiLogExecution('DEBUG', 'SUPPLY MANDATORY PARAMS', 'Item name, location and qunatity to adjust are mandatory parameters and do not have any default values assigned');
        response.write('Item name, location and qunatity to adjust are mandatory parameters and do not have any default values assigned');
    }
}