function createCashRefund(request, response) {

    var cashSaleId = request.getParameter('cashsale');
    var cashRefund = nlapiTransformRecord('cashsale', cashSaleId, 'cashrefund');

    /*
        Customer, location, items details
        will be sourced from cash sale
    */

    var cashRefundId = nlapiSubmitRecord( cashRefund , true);
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created cash refund for the cash sale ' + cashSaleId + ' Refund id ' + cashRefundId);
    response.write('Created cash refund for the cash sale ' + cashSaleId + ' Refund id ' + cashRefundId);
}