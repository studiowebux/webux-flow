// Source: https://stackoverflow.com/a/29497680
function noColor() {
  return this.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ""
  );
}

function toArray() {
  return this.split("\n");
}

String.prototype.toArray = toArray;
String.prototype.noColor = noColor;
