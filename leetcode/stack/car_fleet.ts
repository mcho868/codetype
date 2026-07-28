function carFleet(target: number, position: number[], speed: number[]): number {
    let combined: [number, number, number][] = position.map((pos, index) => [pos, speed[index], (target - pos) / speed[index] ]);

    // 0 = position, 1 = speed, 2 = time
    combined.sort((a, b) => b[0] - a[0]);

    let stack: [number,number,number][] = [];

    for (let i: number = 0; i < position.length; i ++) {
        let car = combined[i];
        if (stack.length == 0 || stack[stack.length - 1][2] < car[2]) {
            stack.push(car);
        }
    }

    return stack.length;
};

// Try it out — press Run
console.log(carFleet(10, [1,4], [3,2]));          // 1
console.log(carFleet(10, [4,1,0,7], [2,2,1,1]));  // 3

export {};
