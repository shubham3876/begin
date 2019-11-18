/*
This function is deployed on Before Submit event on sales order
Creates an instance of a custom record when a sales order is created
only if the record with submitted values does not exist
*/
function customRecord_SalesOrderBeforeSubmit(type) {
    if (type == 'create') {
        var salesOrder = nlapiGetNewRecord();
        var orderId = salesOrder.getFieldValue('tranid');
        var customerId = salesOrder.getFieldValue('entity');
        if (orderId != null && customerId != null)
        {
            // a custom record of type custrecord_sales_order will have to be created
            var customRecordType = 'customrecordcustrecord_sales_order';
            // search if custom record with these values already exists
            var filters = new Array();
            filters[0] = new nlobjSearchFilter('custrecordordernumberid', null, 'is', orderId);
            filters[1] = new nlobjSearchFilter('custrecordcustomernumber', null, 'is', customerId);

            var columns = new Array();
            columns[0] = new nlobjSearchColumn('custrecordordernumberid');
            columns[1] = new nlobjSearchColumn('custrecordcustomernumber');
            
            var checkRecord = nlapiSearchRecord( customRecordType, null, filters, columns);
            if (checkRecord == null) {
                // create
                var customRecord = nlapiCreateRecord(customRecordType);
                customRecord.setFieldValue('custrecordordernumberid', orderId);
                customRecord.setFieldValue('custrecordcustomernumber', customerId);
                var customRecordInternalId = nlapiSubmitRecord( customRecord );
                nlapiLogExecution('DEBUG', 'SUCCESS', 'Created custom record with internal id ' + customRecordInternalId);
            }
            else {
                nlapiLogExecution('DEBUG', 'Record not created', 'Error occured or record already exists');
            }
        }
    }
}