function createCashSale(request, response) {
    var itemId = request.getParameter('item');
    var customerId = request.getParameter('customer');
    var locationId = request.getParameter('location');
    var quantity = request.getParameter('quantity');

    if (itemId && customerId && locationId) {
        if(!quantity) {
            quantity = 1;
        }

        var cashSale = nlapiCreateRecord('cashsale');
        cashSale.setFieldValue('entity', customerId);
        /*
            Remaining fields of customer and item will be sourced
            Can be overriden as well
        */
        cashSale.selectNewLineItem('item');
        cashSale.setCurrentLineItemValue('item', 'item', itemId);
        cashSale.setCurrentLineItemValue('item', 'quantity', quantity);
        cashSale.commitLineItem('item');
        
        cashSale.setFieldValue('location', locationId);
        cashSale.setFieldValue('undepfunds', 'T');

        var cashSaleInternalId = nlapiSubmitRecord( cashSale , true);
        nlapiLogExecution('DEBUG', 'SUCCESS', 'Created a cash sale with internal id ' + cashSaleInternalId);
        response.write('Created a cash sale with internal id ' + cashSaleInternalId);
    }
    else {
        nlapiLogExecution('DEBUG', 'SUPPLY MANDATORY PARAMS', 'A cash sale ought to have an item and a customer');
        response.write('A cash sale ought to have an item and a customer');
    }
}