// import React from "react";

// export default function NotFound() {
//   return <div>404 NotFound</div>;
// }
// try {
//   const response = await fetch("http://localhost:5000/loggeduser", {
//     method: "GET",
//     crossDomain: true,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   });

//   const data = await response.json();
//   const e = data.msg;
//   setEmail(e);
//   fetch("http://localhost:5000/api", {
//     method: "POST",
//     crossDomain: true,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//     body: JSON.stringify({
//       e,
//     }),
//   });

//   const data1 = await response.json();
//   // const e = data.msg;
//   // setEmail(e);
//   console.log(email, "avail2 email");

//   console.log(e, "avail email");
// } catch (error) {
//   console.error(error);
// }

// // try {
// const response = await fetch("http://localhost:5000/api", {
//   method: "POST",
//   crossDomain: true,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
//   body: JSON.stringify({
//     email,
//   }),
// });

// const data = await response.json();
// // const e = data.msg;
// // setEmail(e);
// console.log(email, "avail2 email");
// // } catch (error) {
// //   console.error(error);
// // }
