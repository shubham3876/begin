/*
This function is deployed on before load event on sales order record.
It creates a button.
The button when clicked should write customer name onto a custom field
*/

function createButton_SalesOrderBeforeLoad(type, form) {
    var currentContext = nlapiGetContext();
    var record = nlapiGetNewRecord();
    
    if (type == 'view' && currentContext.getExecutionContext() == 'userinterface') {
        // create button
        nlapiLogExecution('DEBUG', 'type argument', 'type is view');
        var buttonId = 'custpage_load_name_button';
        var buttonLabel = 'Load Customer Name';
        var customerId = record.getFieldValue('entity');
        var columns = new Array();
        columns[0] = new nlobjSearchColumn('internalid');
        columns[1] = new nlobjSearchColumn('entityid');
        var customerRecord = nlapiSearchRecord( 'customer', null, [ [ 'internalid', 'is', customerId ] ], columns);
        if (customerRecord != null) {
            nlapiLogExecution('DEBUG', '1 record should be found', customerRecord.length);
            var customerName = customerRecord[0].getValue('entityid');
            form.addButton(buttonId, buttonLabel, 'loadCustomerName(form, customerName)')
            .setDisabled(false)
            .setVisible(true);
            form.setScript(currentContext.getScriptId());
        }
        else {
            nlapiLogExecution('DEBUG', 'wrong search', 'search criteria was not able to locate the customer');
        }
    } 
}

function loadCustomerName(form, customerName) {
    form.addField('custpage_customer_name_copy',
                  'text',
                  'Custom Customer Name').setDefaultValue(customerName);
    nlapiLogExecution('DEBUG', 'customer name fetched', customerName);
}