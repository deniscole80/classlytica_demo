const { schoolController } = require("./school.controller");
const { getRoute } = require("../../libs/middlewares/get_route");
const { jwtAuthentication } = require("../../libs/middlewares/jwt_auth");
const { uploadImage } = require("../../libs/middlewares/upload_image");
require("express-group-routes");

exports.schoolRoutes = function (app) {
  app.group("/api/v1/school/", (router) => {
    router.post(
      "/create-student",
      [getRoute, jwtAuthentication, uploadImage],
      schoolController.createStudent
    );

    router.post(
      "/fetch-class-students",
      [getRoute, jwtAuthentication],
      schoolController.fetchClassStudents
    );

    router.post(
      "/fetch-school-students",
      [getRoute, jwtAuthentication],
      schoolController.fetchSchoolStudents
    );

    router.post(
      "/create-classroom",
      [getRoute, jwtAuthentication],
      schoolController.createClassroom
    );

    router.post(
      "/fetch-classrooms",
      [getRoute, jwtAuthentication],
      schoolController.fetchClassrooms
    );

    router.post(
      "/search",
      [getRoute, jwtAuthentication],
      schoolController.searchUser
    );

    router.post(
      "/employment-request",
      [getRoute, jwtAuthentication],
      schoolController.sendEmploymentRequest
    );

    router.post(
      "/fetch-employment-requests",
      [getRoute, jwtAuthentication],
      schoolController.fetchEmploymentRequest
    );

    router.post(
      "/search-student",
      [getRoute, jwtAuthentication],
      schoolController.searchStudent
    );

    router.post(
      "/search-parent",
      [getRoute, jwtAuthentication],
      schoolController.searchParent
    );

    router.post(
      "/search-staff",
      [getRoute, jwtAuthentication],
      schoolController.searchStaff
    );

    router.post(
      "/student-parent-group",
      [getRoute, jwtAuthentication],
      schoolController.studentParentGroup
    );

    router.post(
      "/fetch-all-parents",
      [getRoute, jwtAuthentication],
      schoolController.fetchParentList
    );

    router.post(
      "/fetch-all-staffs",
      [getRoute, jwtAuthentication],
      schoolController.fetchStaffList
    );

    router.post(
      "/fetch-student-parent",
      [getRoute, jwtAuthentication],
      schoolController.fetchStudentParent
    );

    router.post(
      "/fetch-student-teacher",
      [getRoute, jwtAuthentication],
      schoolController.fetchStudentTeacher
    );

    router.post(
      "/create-role",
      [getRoute, jwtAuthentication],
      schoolController.createRole
    );

    router.post(
      "/fetch-roles",
      [getRoute, jwtAuthentication],
      schoolController.fetchRoles
    );

    router.post(
      "/create-subject",
      [getRoute, jwtAuthentication],
      schoolController.createSubject
    );

    router.post(
      "/edit-subject",
      [getRoute, jwtAuthentication],
      schoolController.editSubject
    );

    router.post(
      "/fetch-subjects",
      [getRoute, jwtAuthentication],
      schoolController.fetchSubjects
    );

    router.post(
      "/assign-role",
      [getRoute, jwtAuthentication],
      schoolController.assignRole
    );

    router.post(
      "/edit-role",
      [getRoute, jwtAuthentication],
      schoolController.editRole
    );
  });
};
