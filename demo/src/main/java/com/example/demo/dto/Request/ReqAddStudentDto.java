package com.example.demo.dto.Request;

import com.example.demo.entity.Student;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReqAddStudentDto {
    private String name;
    private Long grade;
    private Long studentClass;

    public Student toEntity() {
        return Student.builder()
                .name(name)
                .grade(grade)
                .studentClass(studentClass)
                .build();
    }
}
