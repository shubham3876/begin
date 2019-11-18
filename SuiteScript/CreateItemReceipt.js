function createItemReceipt(request, response) {
    // Once return authorization is approved, we can receive item receipt and update inventory
    var returnAuthorizationId = request.getParameter('rma');
    var restoreLocationId = request.getParameter('location');
    var itemReceipt = nlapiTransformRecord('returnauthorization', returnAuthorizationId, 'itemreceipt');

    // Item details will be sourced, quantity return entry can be modified
    itemReceipt.selectLineItem('item', 1);
    itemReceipt.setCurrentLineItemValue('item', 'location', restoreLocationId);
    itemReceipt.commitLineItem('item')

    var itemReceiptId = nlapiSubmitRecord( itemReceipt , true)
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Received Item Receipt for Return Authorization ' + returnAuthorizationId + ' Item Receipt id ' + itemReceiptId);
    response.write('Received Item Receipt for Return Authorization ' + returnAuthorizationId + ' Item Receipt id ' + itemReceiptId);
}