import StudentService from "../service/StudentService";
import StudentDto from "../dto/StudentDto";
import Student from "../model/Student";
import ScoreDto from "../dto/ScoreDto";
import StudentUpdateDto from "../dto/StudentUpdateDto";
import StudentNewDto from "../dto/StudentNewDto";

export default class StudentController {
    private studentService: StudentService;

    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    addStudent(studentNewDto: StudentNewDto): boolean {
        const student: Student = new Student(studentNewDto.id, studentNewDto.name, studentNewDto.password);
        return this.studentService.addStudent(student);
    }

    findStudent(id: number): StudentDto {
        const student = this.studentService.findStudent(id);
        return new StudentDto(student.id, student.name, Object.fromEntries(student.scores));
    }

    removeStudent(id: number): StudentDto {
        const student = this.studentService.removeStudent(id);
        return new StudentDto(student.id, student.name, student.scores);
    }

    updateStudent(id: number, studentUpdateDto: StudentUpdateDto): StudentNewDto {
        return this.studentService.updateStudent(id, studentUpdateDto.name, studentUpdateDto.password);
    }

    addScore(id: number, scoreDto: ScoreDto): boolean {
        return this.studentService.addScore(id, scoreDto.examName, scoreDto.score);

    }

    getStudentsByName(name: string): StudentDto[] {
        const students = this.studentService.getStudentsByName(name);
        return students.map(s => new StudentDto(s.id, s.name, Object.fromEntries(s.scores)));
    }

    getQuantityStudents(names: string[]): number {
        return this.studentService.getQuantityStudents(names);
    }


    findStudentsByMinScore(exam: string, minScore: number):StudentDto[] {
        const students = this.studentService.findStudentsByMinScore(exam, minScore);
        return students.map(s => new StudentDto(s.id, s.name, Object.fromEntries(s.scores)));

    }
}