export class Game {

    slot: string[][] = []
    bet: number = 0


    spin(bet: number) {
        this.bet = bet
        for (let i = 0; i < 3; i++) {
            this.slot[i] = [];
            for (let j = 0; j < 3; j++) {
                this.slot[i][j] = this.randomvar();
            }
        }
        return this.slot
    }

    evaluate() {
        var and = 0;
        var hash = 0;
        var doll = 0;
        var output = 0

        switch (this.checkEqualRows(this.slot)) {
            case 1:
                for (var i = 0; i < 3; i++) {
                    if (this.rowEqual(this.slot[i])) {
                        if (this.slot[i][1] === "&") {
                            and++;
                        }
                        if (this.slot[i][1] === "#") {
                            hash++
                        }
                        if (this.slot[i][1] === "$") {
                            doll++
                        }
                    }
                }
                output = (and + (2 * hash) + (3 * doll)) * this.bet;

                break;
            case 2:
                for (var i = 0; i < 3; i++) {
                    if (this.rowEqual(this.slot[i])) {
                        if (this.slot[i][1] === "&") {
                            and++;
                        }
                        if (this.slot[i][1] === "#") {
                            hash++
                        }
                        if (this.slot[i][1] === "$") {
                            doll++
                        }
                    }
                }
                output = (and + (2 * hash) + (3 * doll)) * this.bet;
                break;
            case 3:
                for (var i = 0; i < 3; i++) {
                    if (this.rowEqual(this.slot[i])) {
                        if (this.slot[i][1] === "&") {
                            and++;
                        }
                        if (this.slot[i][1] === "#") {
                            hash++;
                        }
                        if (this.slot[i][1] === "$") {
                            doll++;
                        }
                    }
                }
                output = (and + (2 * hash) + (3 * doll)) * this.bet;
                break;
            default:
                output = -(this.bet)
        }
        return output;
    }


    randomvar(): string {
        const symb: string[] = ["&", "#", "$"];
        const n: number = Math.floor(Math.random() * symb.length);
        return symb[n];
    }

    rowEqual(arr: string[]): boolean {
        return arr.every(val => val === arr[0]);
    }

    checkEqualRows(matrix: string[][]): number {
        let count: number = 0;
        for (let row of matrix) {
            if (this.rowEqual(row)) {
                count++;
            }
        }
        return count;
    }

    play(bet:number){
        this.spin(bet)
        let amount = this.evaluate()
        let output = {
            slot : this.slot,
            amount : amount
        }
        return output 
    }

}