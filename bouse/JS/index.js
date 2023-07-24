var siteName = document.getElementById("bookmarkname");
var siteUrl = document.getElementById("siteUrl");
var arr = [];
if (localStorage.getItem("data") != null) {
  arr = JSON.parse(localStorage.getItem("data"));
  display();
}

function addWebsite() {
  var validationResults = validateInputs();
  
  if (
    validationResults.sitenameIsValid &&
    validationResults.urlIsValid 
 
  ) {
    var data = {
      name: siteName.value,
      url: siteUrl.value,
    };

    arr.push(data);
    localStorage.setItem("data", JSON.stringify(arr));
    clear();
    display();
  }  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sitename Or URL Not Valid",
      footer: " Site Name Must Be at least 3 Charcaters and URL must Be Valid",
    });
  }

 
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function display() {
  var ContainerData = "";
  for (var i = 0; i < arr.length; i++) {
    ContainerData += `<tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td><button onclick="visit(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-eye pe-2"></i> &nbsp; Visit</button></td>
        <td><button class="btn btn-outline-primary" onclick="deleteele( ${i} )"><i class="fa-solid fa-trash-can"></i>&nbsp; Delete</button></td>
      </tr>`;
  }
  document.getElementById("tablecontnet").innerHTML = ContainerData;
}

function deleteele(index) {
  arr.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(arr));
  display();
}

function validateInputs() {
  var validateData = {
    validname: /^[a-z0-9]{3,}$/,
    validurl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };
  var namevalid = validateData.validname.test(siteName.value);
  var webvalid = validateData.validurl.test(siteUrl.value);

  return {
    sitenameIsValid: namevalid,
    urlIsValid: webvalid,
  };
}

function visit(indx) {
  if (indx >= 0 && indx < arr.length) {
    var urlToVisit = arr[indx].url;
    open(urlToVisit);
  }
}

