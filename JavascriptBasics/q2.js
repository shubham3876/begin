function MetadataParser(version, channel, keyField) {
  this._version = version;
  this._channel = channel;
  this._keyField = keyField;
  this.getVersion = function() {
    return this._version;
  }
  this.setVersion = function(val) {
    this._version = val;
  }
  this.getChannel = function() {
    return this._channel;
  }
  this.setChannel = function(val) {
    this._channel = val;
  }
  this.getKeyField = function() {
    return this._keyField;
  }
  this.setKeyField = function(val) {
    this._keyField = val;
  }
}

var parser1 = new MetadataParser(1.0, 'ChannelAA', 'K1');
var parser2 = new MetadataParser(5.0, 'ChannelB', 'K2');
parser1.setChannel('ChannelA');
parser2.setVersion(2.0);
console.log(parser1.getChannel());
console.log(parser2.getVersion());
console.log(parser2.getKeyField());

// Part C
var arr = [];
arr.push(parser1);
arr.push(parser2);

MetadataParser.prototype.getKeyFields = function(arr) {
  return _.map(arr, '_keyField');
}

var parser3 = new MetadataParser(1.1, 'ChannelX', 'K3');
var parser4 = new MetadataParser(1.0, 'ChannelB', 'Kn');
arr.push(parser3);
arr.push(parser4);

console.log(parser1.getKeyFields(arr));
