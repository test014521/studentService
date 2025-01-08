import {Router} from "express";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import StudentDto from "../students/dto/StudentDto";
import expressAsyncHandler from "express-async-handler";
import ScoreDto from "../students/dto/ScoreDto";
import StudentNewDto from "../students/dto/StudentNewDto";
import StudentUpdateDto from "../students/dto/StudentUpdateDto";


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);

router.post("/student", expressAsyncHandler(async (req, res) => {
    const studentDto = req.body as StudentNewDto;
    const isSuccess = studentController.addStudent(studentDto);
    isSuccess ? res.status(200).send(true) : res.status(200).send(false);
}))


router.get("/student/:id", expressAsyncHandler(async (req, res) => {
    const id = +req.params.id;
    const student: StudentDto = studentController.findStudent(id);
    res.status(200).send(student);
}))


router.delete("/student/:id", expressAsyncHandler(async (req, res) => {
    const id = +req.params.id;
    const student: StudentDto = studentController.removeStudent(id);
    res.status(200).send(student);
}));

router.put("/student/:id", expressAsyncHandler(async (req, res) => {
    const id = +req.params.id;
    const studentUpdateDto = req.body as StudentUpdateDto;
    const student: StudentNewDto = studentController.updateStudent(id, studentUpdateDto);
    res.status(200).send(student);
}));

router.put("/score/student/:id", expressAsyncHandler(async (req, res) => {
    const id = +req.params.id;
    const scoreDto = req.body as ScoreDto;
    const isSuccess = studentController.addScore(id, scoreDto);
    isSuccess ? res.status(200).send(true) : res.status(200).send(false);
}));


router.get("/students/name/:name", expressAsyncHandler(async (req, res) => {
    const name = req.params.name;
    const studentsByName: StudentDto[] = studentController.getStudentsByName(name);
    res.status(200).send(studentsByName);
}));


router.post("/quantity/students", expressAsyncHandler(async (req, res) => {
    const names = req.body as string[];
    const quantity = studentController.getQuantityStudents(names);
    res.status(200).send(quantity.toString());
}));

router.get("/students/exam/:exam/minscore/:minScore", expressAsyncHandler(async (req, res) => {
    const exam: string = req.params.exam;
    const minScore: number = +req.params.minScore;
    const StudentsByMinScore: StudentDto[] = studentController.findStudentsByMinScore(exam, minScore);
    res.status(200).send(StudentsByMinScore);
}));
export default router;