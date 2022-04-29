const axios = require('axios').default
const fs = require('fs');

const args = process.argv.slice(2);
const status = args[0] == 'on' ? 2 : 1;
const t = status == 2 ? 'ON' : 'OFF';

console.log('\x1b[36m%s\x1b[0m', `[INFO] Coffee Jelly Script ☕🍮`)
console.log('\x1b[36m%s\x1b[0m', `[INFO] Turning ${t}`)

const file = fs.readFileSync('ip.txt', 'utf-8');
const lines = file.split(/\r?\n/);

async function run() {
    for (const line of lines) {
        for (index = 1; index <= 24; index++) {
            const result = await setStatus(line, index, status);
            console.log('\x1b[36m%s\x1b[0m', `[INFO] IP Address: ${line} | Count: ${index} | Result: ${result}`)
        }
    }
}

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log('\x1b[36m%s\x1b[0m', `[INFO] The script uses approximately ${Math.round(used * 100) / 100} MB`);

async function setStatus(ip, count, status) {
    try {
        const response = await axios.get(`http://${ip}/setcontrol?a=${count}&b=${status}&`)
        return response.data
    } catch(error) {
        return 'ERROR'
    }
}

run();