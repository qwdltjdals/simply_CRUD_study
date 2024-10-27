import { css } from '@emotion/react';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { instance } from '../../apis/instance';
/** @jsxImportSource @emotion/react */

const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 1200px;
    border: 1px solid #000000;
    padding: 0 50px 50px;
`;

const mainHeader = css`
    display: flex;
    justify-content: center;
`;

const mainContainer = css`
    display: flex;
    justify-content: space-between;
`;

const inputBox = css`
    display: flex;
    flex-direction: column;

`;

const searchTable = css`
    display: flex;
    border: 1px solid #000000;
    & tr, td {
        border-bottom: 1px solid #000000;
        border-right: 1px solid #000000;
    }
`;

function Student(props) {

    const [students, setStudents] = useState([]);

    const [student, setStudent] = useState({
        id: "",
        name: "",
        grade: "",
        studentClass: ""
    });

    const [studentChange, setStudentChange] = useState(false);

    const { data: studentInfo, refetch } = useQuery(
        ["studentInfoQuery"],
        async () => {
            return await instance.get("student");
        },
        {
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: (response) => {
                console.log('Response Data:', response.data); // response.data가 올바른 형식인지 확인
                setStudents(response.data);
            }
        }
    );

    const addStudent = useMutation(
        ["addStudent"],
        async () => {
            return await instance.post("student/add", student)
        },
        {
            onSuccess: () => {
                refetch();
            }
        }
    )

    const updateStudent = useMutation(
        ["updateStudent"],
        async () => {
            return await instance.put(`student/put/`, student)
        },
        {
            onSuccess: () => {
                refetch();
            }
        }
    )

    const deleteStudent = useMutation(
        ["deleteStudent"],
        async (id) => {
            console.log(id)
            return instance.delete(`/student/delete/${id}`)
        },
        {
            onSuccess: () => {
                refetch();
            }
        }
    )

    const handleInputOnChange = (e) => {
        setStudent((student) => ({
            ...student,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmitButtonOnClick = () => {
        addStudent.mutate(student);
    }

    const handleInputSubmitButtonOnClick = () => {
        updateStudent.mutate(student);
        setStudentChange(false);
        setStudent({
            id: "",
            name: "",
            grade: "",
            studentClass: ""
        });
    }

    const handleStudentInput = (id) => {
        setStudentChange(true);
        const selectedStudent = students.find(student => student.id === id);
        if (selectedStudent) {
            setStudent({
                id: selectedStudent.id,
                name: selectedStudent.name,
                grade: selectedStudent.grade,
                studentClass: selectedStudent.studentClass
            });
        }
    }

    const handleStudentDelete = (id) => {
        if( window.confirm("정말 삭제 하시겠습니까?")) {
            deleteStudent.mutate(id);
        }
    }


    return (
        <div css={layout}>
            {
                studentChange == false
                    ?
                    <>
                        <div css={mainHeader}>
                            <h2>학생 조회 / 추가</h2>
                        </div>
                        <div css={mainContainer}>
                            <div css={inputBox}>
                                <input type="text" name='name' value={student.name} onChange={handleInputOnChange} placeholder='이름' />
                                <input type="text" name='grade' value={student.grade} onChange={handleInputOnChange} placeholder='점수' />
                                <input type="text" name='studentClass' value={student.studentClass} onChange={handleInputOnChange} placeholder='반' />
                                <button onClick={handleSubmitButtonOnClick}>저장하기</button>
                            </div>
                            <div css={searchTable}>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>이름</td>
                                            <td>학년</td>
                                            <td>반</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            students.map((student) => (
                                                <tr key={student.id}>
                                                    <td>{student.name}</td>
                                                    <td>{student.grade}</td>
                                                    <td>{student.studentClass}</td>
                                                    <td><button onClick={() => handleStudentInput(student.id)}>수정</button></td>
                                                    <td><button onClick={() => handleStudentDelete(student.id)}>삭제</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h2>학생 목록 수정</h2>
                        <input type="text" name='name' value={student.name} onChange={handleInputOnChange} placeholder='이름' />
                        <input type="text" name='grade' value={student.grade} onChange={handleInputOnChange} placeholder='점수' />
                        <input type="text" name='studentClass' value={student.studentClass} onChange={handleInputOnChange} placeholder='반' />
                        <button onClick={handleInputSubmitButtonOnClick}>수정하기</button>
                        <button >취소하기</button>
                    </>
            }

        </div>
    );
}

export default Student;