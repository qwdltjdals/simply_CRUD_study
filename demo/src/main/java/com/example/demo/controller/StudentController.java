package com.example.demo.controller;

import com.example.demo.dto.Request.ReqAddStudentDto;
import com.example.demo.dto.Request.ReqPutStudentDto;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/student")
    public ResponseEntity<?> studentView() {
        return ResponseEntity.ok().body(studentService.getStudents());
    }

    @PostMapping("/student/add")
    public ResponseEntity<?> addStudent(@RequestBody ReqAddStudentDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok().body(studentService.addStudent(dto));
    }

    @PutMapping("/student/put")
    public ResponseEntity<?> putStudent(@RequestBody ReqPutStudentDto dto) {
        return ResponseEntity.ok().body(studentService.insertStudent(dto));
    }

    @DeleteMapping("/student/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().body(true);
    }
}
