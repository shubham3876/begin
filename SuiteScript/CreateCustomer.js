function createCustomer(request, response) {
    // Mandatory parameters for the script
    var companyName = request.getParameter('company');
    var subsidiary = request.getParameter('subsidiary');

    var customerRecord = nlapiCreateRecord('customer');
    customerRecord.setFieldValue('subsidiary', subsidiary);
    customerRecord.setFieldValue('companyname', companyName);
    customerRecord.setFieldValue('isperson', 'F');

    var customerId = nlapiSubmitRecord( customerRecord );
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created a customer with internal id ' + customerId);
    response.write('Created a customer with internal id ' + customerId);
}