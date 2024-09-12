const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("description").value;
  var phone = document.getElementById("phone").value;
  console.log(name, email, message, phone);

  if (name == "" || phone == "" || message == "")
    alert("please fill the form properly");
  else {
    var myMessage = `service request: %0A - Full Name: ${name}%0A -  Phone No: ${phone}%0A - Email: ${email}%0A - Message/Country: ${message}`;

    var token = "7505532466:AAEdUza-Ig3QzHLDO4BsEQisGN5N9uRZJLQ";
    var chat_id = -1002430679323;
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${myMessage}&parse_mode=html`;

    let api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    alert("message submitted seccessfully");
    alert("I will get back to you as fast as possible!!");
  }
});
