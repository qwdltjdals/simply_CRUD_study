package com.example.demo.repository;

import com.example.demo.entity.Student;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.Mapping;

import java.util.List;

@Mapper
public interface StudentMapper {
    List<Student> findAll();
    int addStudent(Student student);
    int updateStudent(Student student);
    int deleteStudent(Long id);
}
