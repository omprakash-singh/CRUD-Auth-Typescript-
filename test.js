const time = new Date().getHours();
let greeting;
if (time < 10) {
     greeting = "Good morning";
} else if (time < 20) {
     greeting = "Good day";
} else {
     greeting = "Good evening";
}
console.log(greeting);

let sum = 35;
if (sum % 10 == 0) {
     console.log('a');
} else if (sum % 2 == 1) {
     if (sum % 5 == 0 && sum % 2 == 0) {
          console.log('b');
     } else if (sum % 5 == 0) {
          console.log('c');
     } else {
          console.log('d');
     }
} else {
     console.log('e');
}
let low = 0;
let h = 10;
while (low <= h) {
     console.log(low);
     low++;
}

for (let i = 0; i < 10; i++) {
     console.log("Kya time pass hai Yaar 🙄🙄🙄");
}