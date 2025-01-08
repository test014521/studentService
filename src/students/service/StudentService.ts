import Student from "../model/Student";

export default interface StudentService {
    addStudent(student: Student): boolean;

    findStudent(id: number): Student;

    removeStudent(id: number): Student;

    updateStudent(id: number, name: string, password: string): Student;

    getQuantityStudents(names: string[]): number;

    getStudentsByName(name: string): Student[];

    addScore(id: number, examName: string, score: number): boolean;

    findStudentsByMinScore(exam: string, minScore: number): Student[];
}