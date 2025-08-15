import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const ask = (question) => {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
};

export const closePrompt = () => rl.close();
