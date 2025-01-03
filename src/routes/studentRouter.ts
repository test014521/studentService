import {Router} from "express";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import StudentDto from "../students/dto/StudentDto";
import expressAsyncHandler from "express-async-handler";


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
//http://localhost:8080/students/exam/:exam/minscore/:minScore
// const {exam,minScore} = req.params;
//
router.post("/student",expressAsyncHandler(async(req,res)=>{
    // const id = req.params.id;
    const studentDto = req.body as StudentDto;
    const isSuccess = studentController.addStudent(studentDto);
    if(isSuccess){
        res.status(200).send({status: "Success !"});
    }

}))

export default router;