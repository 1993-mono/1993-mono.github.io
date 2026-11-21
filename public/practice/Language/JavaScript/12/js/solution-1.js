// 기존의 JSON 데이터는 API를 발급받아야 해서 새로운 JSON 데이터 주소 제공
// const url = "https://reqres.in/api/products/10" 

const url = "https://dummyjson.com/products/10";
const result = document.querySelector("#result");

let xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.send();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let product = JSON.parse(xhr.responseText);
    console.log(product);
    result.innerHTML = `
      <p>상품명 : ${product.title}</p>
      <p>가격 : ${product.price}</p>
      `;
    }
  }
