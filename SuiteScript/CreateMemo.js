function createCreditMemo(request, response) {
    // Once item receipt is generated, we can refund and generate memo
    var returnAuthorizationId = request.getParameter('rma');
    var locationId = request.getParameter('location');
    var creditMemo = nlapiTransformRecord('returnauthorization', returnAuthorizationId, 'creditmemo');

    creditMemo.setFieldValue('location', locationId);
    // Rest of the details will be sourced

    var memoId = nlapiSubmitRecord( creditMemo , true)
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created credit memo for Return Authorization ' + returnAuthorizationId + ' Memo id ' + memoId);
    response.write('Created credit memo for Return Authorization ' + returnAuthorizationId + ' Memo id ' + memoId);
}