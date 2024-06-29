/*SECTION problem statemetn- 

The text file contains temperature values for a range of weather stations. Each row is one measurement in the format <string: station name>;<double: measurement>, with the measurement value having exactly one fractional digit. The following shows ten rows as an example:

Hamburg;12.0
Bulawayo;8.9
Palembang;38.8
St. John's;15.2
Cracow;12.6
Bridgetown;26.9
Istanbul;6.2
Roseau;34.4
Conakry;31.2
Istanbul;23.0
The task is to write a Java program which reads the file, calculates the min, mean, and max temperature value per weather station, and emits the results on stdout like this (i.e. sorted alphabetically by station name, and the result values per station in the format <min>/<mean>/<max>, rounded to one fractional digit):

{Abha=-23.0/18.0/59.2, Abidjan=-16.2/26.0/67.3, Abéché=-10.0/29.4/69.0, Accra=-10.1/26.4/66.4, Addis Ababa=-23.7/16.0/67.0, Adelaide=-27.8/17.3/58.5, ...}


*/

//stepsz

/*SECTION

    read file 
    parse data
    store data in appropriate data structure
    calculate results
    return results

!SECTION
*/



const { exec, execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const perfomance = require('perf_hooks').performance;









//getting the file 

const fileName = process.argv[2];

const startTime = perfomance.now();

if (!fileName) {
    console.error('Please provide a file name.');
    process.exit(1);
}

//creating an interface for reading the file
const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    crlfDelay: Infinity
});



const temperatureStats = new Map();
let lineCount = 0;
rl.on('line', (line) => {
    lineCount++;

    const [station, temp] = line.split(';');
    const temperature = parseFloat(temp);
    // console.log("line : ", linecount, station, temperature);
    if (!temperatureStats.has(station)) {
        temperatureStats.set(station, {
            min: temperature,
            max: temperature,
            sum: temperature,
            count: 1
        });
    } else {
        const stats = temperatureStats.get(station);
        stats.min = Math.min(stats.min, temperature);
        stats.max = Math.max(stats.max, temperature);
        stats.sum += temperature;
        stats.count++;
    }

    // Periodically log progress
    if (lineCount % 1000000 === 0) {
        console.log(`Processed ${lineCount / 1000000} million lines so far...`);
    }
});

//wait for the whole file to be read
rl.on('close', () => {
    // console.log(data);
    console.log('File processed in', perfomance.now() - startTime, 'ms');
});


//function to calculate the min, mean and max temperature value per weather station
/*
stationData = {
    station
}
*/
