function ChannelDetails(channel, name) {
  this.channel = channel;
  this.name = name;
}

function groupObjectsBy(arr) {
  return _.groupBy(arr, 'channel');
}

var obj1 = new ChannelDetails('A', 'Shoe');
var obj2 = new ChannelDetails('A', 'Electronics');
var obj3 = new ChannelDetails('B', 'Apparel');
var obj4 = new ChannelDetails('C', 'Electronics');

var arr = [obj1, obj2, obj3, obj4];

console.log(groupObjectsBy(arr));
