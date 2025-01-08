import StudentService from "./StudentService";
import Student from "../model/Student";
import StudentRepository from "../dao/StudentRepository";

export default class StudentServiceImpl implements StudentService {
    private studentRepository = new StudentRepository();

    addStudent(student: Student): boolean {
        const students: Student[] = this.studentRepository.readAll()
        if (students.findIndex(s => s.id === student.id) >= 0) {
            return false;
        }
        students.push(student);
        return this.studentRepository.writeAll(students);
    }

    findStudent(id: number): Student {
        const students: Student[] = this.studentRepository.readAll()
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        return students[index];
    }


    removeStudent(id: number): Student {
        const students: Student[] = this.studentRepository.readAll()
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        const victim = students[index];
        students.splice(index, 1);
        this.studentRepository.writeAll(students);
        return victim;
    }

    updateStudent(id: number, name: string, password: string): Student {
        const students: Student[] = this.studentRepository.readAll()
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        const student = students[index];
        student.name = name;
        student.password = password;
        students[index] = student;
        this.studentRepository.writeAll(students);
        return student;
    }

    addScore(id: number, examName: string, score: number): boolean {
        const students: Student[] = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if (index < 0) throw new Error(`Student with id ${id} not found`);
        const student = students[index];
        try {
            student.addScore(examName, score);
        } catch (e: Error | any) {
            console.log(e.message)
            return false;
        }
        students[index] = student;
        this.studentRepository.writeAll(students);
        return true;
    }

    getStudentsByName(name: string): Student[] {
        const students: Student[] = this.studentRepository.readAll()
        return students.filter(s => s.name.toLowerCase() === name.toLowerCase());
    }

    getQuantityStudents(names: string[]): number {
        return this.studentRepository.readAll()
            .filter(s => names.includes(s.name)).length;
    }

    findStudentsByMinScore(exam: string, minScore: number): Student[] {
        const students: Student[] = this.studentRepository.readAll();
        
        return students.filter(s => s.scores.get(exam)!>minScore);
    }

}