function postRecord(type, datain){
    var record = nlapiCreateRecord(datain.recordType);
    for (var fieldName in datain) {
        if (datain.hasOwnProperty(fieldName)) {
            if (fieldName != 'recordType' && fieldName != 'id' ) {
                var val = datain[fieldName];
                if (val && typeof val != 'object') {
                    record.setFieldValue(fieldName, val);
                }
            }
        }
    }
    var recordId = nlapiSubmitRecord(record, true);
    nlapiLogExecution('DEBUG', 'SUCCESS', 'Created a record with id ' + recordId);
    return nlapiLoadRecord(datain.recordType, recordId);
    // response of the post request is the record created
}

function deleteRecord(type, datain){
    var id = nlapiDeleteRecord(datain.recordtype,datain.id);
    return id;
}

function getRecord(type, datain) {
    return nlapiLoadRecord(datain.recordType, datain.id);
    /*
        example -- 
        request method : GET with params ?recordType=customer&id=123
        Return customer record with internal id 123
    */
}