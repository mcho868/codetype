function dailyTemperatures(temperatures: number[]): number[] {
    let tempStack: [number, number][] = [];
    let outputTemp: number[] = Array(temperatures.length).fill(0)
    for (let i: number = 0; i < temperatures.length; i ++){
        if (tempStack.length === 0){
            tempStack.push([temperatures[i], i]);
        }
        else{
            while (tempStack.length > 0 && temperatures[i] > tempStack[tempStack.length - 1]![0]) {
                let temp: [number, number] = tempStack.pop()!;
                outputTemp[temp[1]] = i - temp[1];
            }
            tempStack.push([temperatures[i], i]);
        }
    }
    return outputTemp
};

// Try it out — press Run
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60]));              // [1,1,1,0]
console.log(dailyTemperatures([30,60,90]));                 // [1,1,0]

export {};
