function fulfillSalesOrder(request, response) {
    var salesOrderId = request.getParameter('order');
    var locationId = request.getParameter('location');
    var quantity = request.getParameter('quantity');
    var salesOrder = nlapiSearchRecord( 'salesorder', null, [ [ 'internalid', 'is', salesOrderId ] ]);
    if (!salesOrder) {
        response.write("Please provide valid sales order id");
        return;
    }
    var itemFulfillment = nlapiTransformRecord('salesorder', salesOrderId, 'itemfulfillment');

    itemFulfillment.selectLineItem('item',1);
    itemFulfillment.setCurrentLineItemValue('item', 'quantity', quantity);
    itemFulfillment.setCurrentLineItemValue('item', 'location', locationId);
    itemFulfillment.commitLineItem('item');

    var itemFulfillmentInternalId = nlapiSubmitRecord( itemFulfillment , true)
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Fulfilled sales order ' + salesOrderId + ' with quantity = ' + quantity + ' Fulfillment id ' + itemFulfillmentInternalId);
    response.write('Fulfilled sales order ' + salesOrderId + ' with quantity = ' + quantity + ' Fulfillment id ' + itemFulfillmentInternalId);
}