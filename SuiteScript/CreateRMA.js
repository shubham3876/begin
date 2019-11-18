function createRMA(request, response) {
    var salesOrderId = request.getParameter('order');
    var returnAuthorization = nlapiTransformRecord('salesorder', salesOrderId, 'returnauthorization');

    // Item details will be sourced from sales order
    var returnAuthorizationInternalId = nlapiSubmitRecord( returnAuthorization , true)
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Inititated return for sales order ' + salesOrderId + ' RMA id ' + returnAuthorizationInternalId);
    response.write('Inititated return for sales order ' + salesOrderId + ' RMA id ' + returnAuthorizationInternalId);
}