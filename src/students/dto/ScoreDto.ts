export default class ScoreDto {
    examName: string;
    score: number;

    constructor(examName: string, score: object) {
        this.examName = examName;
        this.score = score;
    }
}