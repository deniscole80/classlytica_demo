export function downloadFile(data: Object) {
  var contentType = "application/vnd.ms-excel";
  // var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  var blob = new Blob([(<any>data)], { type: contentType });
  var url = window.URL.createObjectURL(blob);
  window.open(url);
}


export function downloadAnyFile(data: Object, extension: string) {
  if (extension == 'pdf') {
    var contentType = "application/pdf";
  }

  else if (extension == 'xls' || extension == 'csv') {
    var contentType = "application/vnd.ms-excel";
  }

  else if (extension == 'xlsx') {
    var contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  }

  else if (extension == 'xlsm') {
    var contentType = "application/vnd.ms-excel.sheet.macroEnabled.12";
  }

  else if (extension == 'docx') {
    var contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }

  else if (extension == 'doc') {
    var contentType = "application/msword";
  }

  else if (extension == 'ppt') {
    var contentType = "application/vnd.ms-powerpoint";
  }

  else if (extension == 'pptx') {
    var contentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  }

  else {
    var contentType = "application/msword";
  }

  var blob = new Blob([(<any>data)], { type: contentType });
  var url = window.URL.createObjectURL(blob);
  window.open(url);
}