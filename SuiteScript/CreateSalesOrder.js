function createSalesOrder(request, response) {
    var itemId = request.getParameter('item');
    var customerId = request.getParameter('customer');
    var quantity = request.getParameter('quantity');
    if (itemId && customerId && quantity) {
        var salesOrder = nlapiCreateRecord('salesorder');
        salesOrder.setFieldValue('entity', customerId);
        salesOrder.selectNewLineItem('item');
        salesOrder.setCurrentLineItemValue('item', 'item', itemId);
        salesOrder.setCurrentLineItemValue('item', 'quantity', quantity);
        
        salesOrder.commitLineItem('item');
        var salesOrderInternalId = nlapiSubmitRecord( salesOrder , true); // doSourcing flag set to true
        nlapiLogExecution('DEBUG', 'SUCCESS', 'Created a sales order with internal id ' + salesOrderInternalId);
        response.write('Created a sales order with internal id ' + salesOrderInternalId);
    }
    else {
        nlapiLogExecution('DEBUG', 'SUPPLY MANDATORY PARAMS', 'You ought to have item, customer and qunatity required to have a sales order');
        response.write('You ought to have item, customer and qunatity required to have a sales order');
    }
}