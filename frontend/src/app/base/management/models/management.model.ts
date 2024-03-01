export interface fetchSchoolStudents{
    school_id: number
}
export interface fetchClassStudents{
    school_id: number
    class_id: number
}

export interface createClassroom{
    school_id: number
    school: string
    level: number
    alias: string
    staff_id: number
    staff_type: number
}

export interface createSubject{
    school_id: number
    staff_id: number
    staff_type: number
    subject_name: string
    alias: string
}

export interface fetchClassroom{
    school_id: number
}

export interface fetchSubjects{
    school_id: number
}
export interface searchUser{
    keyword: string
    user_type: number
}
export interface searchSchoolStaff{
    school_id: number
    keyword: string
}

export interface employmentRequest{
    school_id: number
    staff_id: number
    staff_type: number
    recipient_id: number
    status: string
}

export interface employmentRequestaction{
    school_id: number
    recipient_id: number
    request_id: number
    staff_id: number
    staff_type: number
    status: string
}

export interface fetchRequest{
    start: number
    length: number
    school_id: number
    status: string
}


export interface acceptRequest{
    school_id: number
    recipient_id: number
    request_id: number
    status: string
    staff_id: number
    staff_type: number
    notification_id: number
}

export interface declineRequest{
    school_id: number
    recipient_id: number
    request_id: number
    status: string
    staff_id: number
    staff_type: number
    notification_id: number
    reason: string
}

export interface studentParentGroup{
    school_id: number
    staff_id: number
    staff_type: number
    group: group[]
}

export interface group{
    parents: number[]
    students: number[]
}

export interface fetchAllParents{
    school_id: number
    staff_id: number
    staff_type: number
    start: number
    length: number
}

export interface searchParent{
    keyword: string
}

export interface searchStudent{
    school_id: number
    keyword: string
}

export interface fetchAllStaff{
    school_id: number
    staff_id: number
    staff_type: number
    start: number
    length: number
}

// Role Management
export interface fetchParent{
    employer_id: number
    student_id: number
}

export interface fetchStudentTeacher{
    school_id: number
    student_id: number
}

export interface fetchRoles{
    school_id: number
}

export interface assignRole{
    school_id: number
    staff_id: number
    staff_type: number
    user_id: number
    role_id: number
}

export interface createRole{
    school_id: number
    staff_id: number
    staff_type: number
    role_name: string
    access: roleAssign[]
}

export interface roleAssign{
    access_name: string 
    class_id?: number
    subject_ids?: number[]
}

export interface editRoles{
    school_id: number
    staff_id: number
    staff_type: number
    role_id: number
    access: roleAssign[]
}