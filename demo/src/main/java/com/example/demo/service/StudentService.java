package com.example.demo.service;

import com.example.demo.dto.Request.ReqAddStudentDto;
import com.example.demo.dto.Request.ReqPutStudentDto;
import com.example.demo.dto.Response.RespStudentViewDto;
import com.example.demo.entity.Student;
import com.example.demo.repository.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentMapper studentMapper;

    public List<RespStudentViewDto> getStudents() {

        List<Student> students = studentMapper.findAll();
        return students.stream()
                .map(student -> RespStudentViewDto.builder()
                        .id(student.getId())
                        .studentClass(student.getStudentClass())
                        .grade(student.getGrade())
                        .name(student.getName())
                        .build())
                .collect(Collectors.toList());
    }

    public boolean addStudent(ReqAddStudentDto dto) {
        Student student = dto.toEntity();
        studentMapper.addStudent(student);
        return true;
    }

    public int insertStudent(ReqPutStudentDto dto) {
        Student student = dto.toEntity();
        return studentMapper.updateStudent(student);
    }

    public void deleteStudent(Long id) {
        studentMapper.deleteStudent(id);
    }
}
