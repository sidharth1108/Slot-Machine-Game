import { Game } from "./game";


export const handler = async (event: any) => {
    let game = new Game();

    let matrix = game.spin(event.bet)
    let winnings = game.evaluate();
    let output = {
        "slot": matrix,
        "winnings": winnings
    }
    return output;
};

