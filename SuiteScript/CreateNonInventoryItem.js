function createItem(request, response) {
    var itemName = request.getParameter('itemName');
    var itemRecord = nlapiCreateRecord('noninventorysaleitem');
    itemRecord.setFieldValue('itemid', itemName);
    itemRecord.setFieldValue('taxschedule', 1);
    var itemRecordInternalId = nlapiSubmitRecord( itemRecord );
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created a non inventory sales item with internal id ' + itemRecordInternalId);
    response.write('Created a non inventory sales item with internal id ' + itemRecordInternalId);
}