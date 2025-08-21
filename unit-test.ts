import { Account } from "./src/account"
let acc = new Account();
acc.account("BankAddWid", "sid", -10000).then(response => {
    console.log(response);
});

import { Game } from "./src/game"

const game = new Game()

game.play(100).then((res) => {
    console.log(res);
})
