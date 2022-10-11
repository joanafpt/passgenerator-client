//const GET_PSW = "/get-password";
console.log(process.env.API_URL);
const CLIENT = "http://localhost:3000";
//const SERVER = "http://localhost:5002";
const SERVER = "https://password-app-test.herokuapp.com";

export const genPassword = (value, callback) => {
  fetch(SERVER + "/get-password", {
    method: "GET",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": CLIENT,
      value: value,
    },
  })
    //.then((response) => console.log(response))
    .then((response) => response.json())
    .then((data) => callback(data));
};
