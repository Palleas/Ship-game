var i = 0;
setInterval(function()
{
  i++;
}, 10);

onmessage = function(e)
{
  var d = e.data;
  if (d == "status")
  {
    postMessage({index: i});
  }
}