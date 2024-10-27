package com.example.demo.dto.Request;

import com.example.demo.entity.Student;
import lombok.Data;

@Data
public class ReqPutStudentDto {
    private Long id;
    private String name;
    private Long grade;
    private Long studentClass;

    public Student toEntity() {
        return Student.builder()
                .id(id)
                .name(name)
                .grade(grade)
                .studentClass(studentClass)
                .build();
    }
}
