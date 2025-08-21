import { doRequest } from "./utils";

export class Game {
    async play(bet: number) {
        let gameRequest = {
            bet: bet
        };
        const options = {
            url: __GAME_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameRequest)
        };

        try {
            const gameResponse = await doRequest(options);
            return gameResponse
        } catch (err) {
            console.log(JSON.stringify(err));
            return undefined;
        }
    }
}



