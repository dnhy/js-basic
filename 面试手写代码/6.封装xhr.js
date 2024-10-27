ajax({
  type: 'post',
  dataType: 'json',
  data: {},
  url: 'https://xxxx',
  success: function (text, xml) {
    //请求成功后的回调函数
  },
  fail: function (status) {
    ////请求失败后的回调函数
  },
});

function ajax(options) {
  const xhr = new XMLHttpRequest();
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  // options.dataType = options.dataType || 'json';
  const params = options.data;
  if (options.type === 'GET') {
    xhr.open('GET', options.url, true);
    xhr.send(null);
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true);
    xhr.send(params);
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status <= 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };

  xhr.onerror = () => {
    options.fail && options.fail(xhr.status);
  };
}

function ajax(options) {
  const xhr = new XMLHttpRequest();
  options.dataType = (options.dataType || 'get').toUpperCase();
  xhr.open(options.dataType, options.url, true);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(options.dataType === 'POST' ? options.params : null);
  xhr.onreadystatechange = () => {
    let status = xhr.status;
    if (xhr.readyState != 4) return;
    if (status === 200) {
      options.success && options.success(xhr.response);
    } else {
      options.fail && options.fail(xhr.statusText);
    }
  };

  xhr.onerror = () => {
    options.fail && options.fail(xhr.statusText);
  };
}
