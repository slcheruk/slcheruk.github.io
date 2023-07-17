let v = 0.0003;
let v_new = v * 8;
let H = 2.923;

let center = [9.57, 19.5];
let centerx = center[0];
let centery = center[1];
let delta_x = 32.55;
let delta_y = 47.71;

let center2 = [centerx, centery + delta_y];
let center3 = [centerx + delta_x, centery + delta_y];
let center4 = [centerx + delta_x, centery];
let center5 = [centerx + 2 * delta_x, centery + delta_y];
let center6 = [centerx + 2 * delta_x, centery];
let center7 = [centerx + 3 * delta_x, centery + delta_y];
let center8 = [centerx + 3 * delta_x, centery];
let centers_all = [center, center2, center3, center4, center5, center6, center7, center8];

centerx = center[0];
centery = center[1];

let ID = 1.372;

v_new = v * 8;
H = 2.923;

let s = 15;
let dist = s * Math.sin(60) * 0.5;

let center_str = `G1 X${center[0]} Y${center[1]} Z40 E0`;
let center_down = `G1 X${center[0]} Y${center[1]} Z19 E0`;
let x = [centerx, centerx, centerx + s / 2, centerx - s / 2, centerx];
let y = [centery, centery + s * Math.sin(60) * 0.5, centery - s * Math.sin(60) * 0.5, centery - s * Math.sin(60) * 0.5, centery + s * Math.sin(60) * 0.5];

let first_val = "G28 0 0 0 0 0 0 0 0";
let second_val = "G90 0 0 0 0 0 0 0 0";
let third_val = "G92 E0 0 0 0 0 0 0 0";

let shapes = Math.ceil(dist / (0.95 * ID));

let P = [];
P.push(`G1 X${x[1]} Y${y[1]} Z19 E1`);
P.push(`G1 X${x[2]} Y${y[2]} Z19 E1`);
P.push(`G1 X${x[3]} Y${y[3]} Z8.5 E1`);
P.push(`G1 X${x[4]} Y${y[4]} Z19 E1`);

let sum_newx = [];
let sum_newy = [];
let dist_new = [];
let distsum = [];

for (let ii = 0; ii < shapes; ii++) {
 let P1 = [];
 P1.push(`G1 X${x[1] + Math.abs(x[1] - x[0]) * (1 / shapes) * ii} Y${y[1] - Math.abs(y[1] - y[0]) * (1 / shapes) * ii} Z19 E1`);
 P1.push(`G1 X${x[2] - Math.abs(x[2] - x[0]) * (1 / shapes) * ii} Y${y[2] + Math.abs(y[2] - y[0]) * (1 / shapes) * ii} Z19 E1`);
 P1.push(`G1 X${x[3] + Math.abs(x[3] - x[0]) * (1 / shapes) * ii} Y${y[3] + Math.abs(y[3] - y[0]) * (1 / shapes) * ii} Z19 E1`);
 P1.push(`G1 X${x[4] + Math.abs(x[4] - x[0]) * (1 / shapes) * ii} Y${y[4] - Math.abs(y[4] - y[0]) * (1 / shapes) * ii} Z19 E1`);

 let New_x = [
    x[1] + Math.abs(x[1] - x[0]) * (1 / shapes) * ii,
    x[2] - Math.abs(x[2] - x[0]) * (1 / shapes) * ii,
    x[3] + Math.abs(x[3] - x[0]) * (1 / shapes) * ii,
    x[4] + Math.abs(x[4] - x[0]) * (1 / shapes) * ii
  ];
 let New_y = [
    y[1] - Math.abs(y[1] - y[0]) * (1 / shapes) * ii,
    y[2] + Math.abs(y[2] - y[0]) * (1 / shapes) * ii,
    y[3] + Math.abs(y[3] - y[0]) * (1 / shapes) * ii,
    y[4] - Math.abs(y[4] - y[0]) * (1 / shapes) * ii
  ];

  sum_newx.push(New_x);
  sum_newy.push(New_y);

  dist_new[ii] = Math.abs(New_x[2] - New_x[3]);
  distsum[ii] = 3 * dist_new[ii];
}

let nums = [];
let count = dist_new.length - 1;
for (let n = 0; n < 8; n++) {
 let center = centers_all[n];
 let centerx = center[0];
 let centery = center[1];

  nums.push(center_str);
  nums.push(center_down);
 for (let i = 0; i < count; i++) {
    nums.push(P[0]);
    nums.push(P[1]);
    nums.push(P[2]);
    nums.push(P[3]);
  }
}

let Final = [];
Final.push(first_val);
Final.push(second_val);
Final.push(third_val);

for (let i = 0; i < nums.length; i++) {
 Final.push(nums[i]);
}

// Writing the final G-code to a file
const fs = require('fs');
function Triangle () {
fs.writeFileSync('G-Code-trinagle.txt', Final.join('\n'));
console.log("File written successfully\n");
console.log("The written has the following contents:");
console.log(fs.readFileSync("G-Code-trinagle.txt", "utf8"));
}
function Square () {
fs.writeFileSync('G-Code-Square.txt', Final.join('\n'));
console.log("File written successfully\n");
console.log("The written has the following contents:");
console.log(fs.readFileSync("G-Code-Square.txt", "utf8"));
}