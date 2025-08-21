import { doRequest } from "./utils"



export class Account {

    async account(func: string, username: string, attribute?: any) {

        let gameRequest = {
            function: func,
            username: username,
            attribute: attribute
        }
        const options = {
            url:__ACCOUNT_API_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameRequest)
            // qs: {
            //     bet: bet
            // }
        };

        try {
            const gameResponse = await doRequest(options);
            return gameResponse
        } catch (err) {
            console.log(JSON.stringify(err))
        }
    }

}
