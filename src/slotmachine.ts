import { Account } from "./account";
import { Game } from "./game";
import { Utils } from "./utils";
interface GameOutput {
    slot: string[][],
    winnings: number
}
var utils = new Utils();
var acc = new Account();
const game = new Game();
export function slotmachine() {
    document.addEventListener('DOMContentLoaded', () => {
        const messageElement = document.getElementById('message') as HTMLElement;
        const bankElement = document.getElementById('bank1') as HTMLInputElement;
        const betElement = document.getElementById('bet') as HTMLInputElement;
        const slotResultsElement = document.getElementById('slotResults') as HTMLElement;
        const bankbalanceElement = document.getElementById('bankbalance') as HTMLElement;
        const BankAddButton = document.getElementById('bankadd') as HTMLButtonElement;
        const spinButton = document.getElementById('spin') as HTMLButtonElement;
        const statusElement = document.getElementById('status') as HTMLElement;
        const exitButton = document.getElementById('exit') as HTMLButtonElement;
        var modal = document.getElementById("authModal") as HTMLElement;
        var btn = document.getElementById("authBtn") as HTMLButtonElement;
        var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;
        const usernameElement = document.getElementById('username') as HTMLInputElement;
        const passwordElement = document.getElementById('password') as HTMLInputElement;
        const signinButton = document.getElementById('signin') as HTMLButtonElement;
        const signupButton = document.getElementById('signup') as HTMLButtonElement;
        if (!messageElement || !bankElement || !betElement || !slotResultsElement || !bankbalanceElement || !BankAddButton || !spinButton || !statusElement || !exitButton) {
            console.error("One or more elements not found. Please check the HTML.");
            return;
        }
        messageElement.textContent = "Sign in or create an account to start the game!";

        let username = "none";

        bankElement.addEventListener('input', utils.filterField);
        betElement.addEventListener('input', utils.filterField);
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        exitButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to exit? All changes will be lost.')) {
                location.reload();
            }
        });
        signinButton.addEventListener('click', () => {
            let user = usernameElement.value;
            let password = passwordElement.value;
            acc.account("UserVerify", user, password).then(response => {
                if (response == "verified") {
                    username = user;
                    acc.account("getBankBalance", username).then(response => {
                        let bankbal = response;
                        bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                        messageElement.textContent = `Welcome, ${username}! add amount to your account and spin to play the game!`;
                        modal.style.display = "none";
                    });
                }
                else {
                    alert("username or password incorrect")
                }
            });
        })
        signupButton.addEventListener('click', () => {
            let user = usernameElement.value;
            let password = passwordElement.value;
            acc.account("UserAdd", user, password).then(response => {
                if (response == "user added") {
                    username = user;
                    acc.account("getBankBalance", username).then(response => {
                        let bankbal = response;
                        bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                        messageElement.textContent = `Welcome, ${username}! add amount to your account and spin to play the game!`;
                        modal.style.display = "none";
                    });
                }
                else {
                    alert("username already exists")
                }
            });
        })
        BankAddButton.addEventListener('click', () => {
            let bank: number = parseFloat(bankElement.value);
            if (username == "none") {
                alert("sign in or sign up to start the game!")
            }
            else {
                if ((utils.isNumber(bank) === false || bank <= 0)) {
                    alert("Enter a valid number!");
                }
                if (bank < 10000000000) {
                    acc.account("BankAddWid", username, bank);
                }
                if (bank >= 10000000000) {
                    alert("Amount too high!");
                }
                setTimeout(() => {
                    acc.account("getBankBalance", username).then(response => {
                        let bankbal;
                        bankbal = response;
                        bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                    });
                }, 100);
            }
        });

        spinButton.addEventListener('click', () => {
            const bet = parseFloat(betElement.value);
            let bankbal;
            acc.account("getBankBalance", username).then(response => {
                bankbal = response;
                if (username == "none") {
                    alert("sign in or sign up to start the game!")
                }
                else {
                    if (utils.isNumber(bet) === false) {
                        alert("Enter a valid number!");
                        return;
                    }
                    if (bet > bankbal) {
                        alert("Not enough balance!");
                        return;
                    }
                    if (bankbal < 10) {
                        alert("At least $10 should be deposited to play the game");
                        return;
                    } else {
                        messageElement.textContent = "Game started. Place your bet and spin the slot machine!";
                        game.play(bet).then((res) => {
                            let beoutput = res as GameOutput
                            let slot = beoutput.slot;
                            let output = beoutput.winnings;
                            slotResultsElement.innerHTML = '';
                            slot.forEach(row => {
                                const rowDiv = document.createElement('div');
                                rowDiv.classList.add('slot-row');
                                row.forEach(cell => {
                                    const cellDiv = document.createElement('div');
                                    cellDiv.classList.add('slot-cell');
                                    cellDiv.textContent = cell;
                                    rowDiv.appendChild(cellDiv);
                                });
                                slotResultsElement.appendChild(rowDiv);
                            });

                            if (output > 0) {
                                statusElement.textContent = `You won $${output}!`;
                                acc.account("BankAddWid", username, output).then(response => {
                                    let bankbal;
                                    bankbal = response;
                                    bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                                })
                                confetti({
                                    particleCount: 300,
                                    spread: 90,
                                    origin: { x: 1, y: 0.9 },
                                });
                                confetti({
                                    particleCount: 300,
                                    spread: 90,
                                    origin: { x: 0, y: 0.9 },
                                });
                            } else {
                                statusElement.textContent = `You lost $${bet}, keep trying!`;
                                acc.account("BankAddWid", username, -bet).then(response => {
                                    let bankbal;
                                    bankbal = response;
                                    bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
                                })
                            }

                        });
                    }

                }
            })

        });
    })
}
slotmachine();


