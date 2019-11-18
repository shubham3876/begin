function billOrder(request, response) {
    var salesOrderId = request.getParameter('order');
    var billRecord = nlapiTransformRecord('salesorder', salesOrderId, 'invoice');

    var billRecordInternalId = nlapiSubmitRecord( billRecord , true)
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Billed sales order ' + salesOrderId + ' Invoice id ' + billRecordInternalId);
    response.write('Billed sales order ' + salesOrderId + ' Invoice id ' + billRecordInternalId);
}
