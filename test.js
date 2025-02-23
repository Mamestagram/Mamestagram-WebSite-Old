let x = 31767;
x -= 1 << 4;
console.log(x);
for (let i = 0; Math.pow(2, i) <= x; i++) {
    if ((x & 1 << i) > 0) {
        console.log(i);
    }
}