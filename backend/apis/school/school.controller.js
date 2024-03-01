const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { schoolModel } = require("./school.model");
const Utils = require("../../configs/utils");
const Mailer = require("../../libs/emails/mailchimp");
const { helpers } = require("../../libs/utilities/helpers");
const fs = require("fs");

const { successful, redirection, client_error, server_error } =
  Utils.status_codes;

exports.schoolController = {
  createStudent: (req, res) => {
    console.log(req.body);

    schoolModel.createStudent(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  fetchClassStudents: (req, res) => {
    console.log(req.body);

    schoolModel.fetchClassStudents(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchSchoolStudents: (req, res) => {
    console.log(req.body);

    schoolModel.fetchSchoolStudents(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  createClassroom: (req, res) => {
    console.log(req.body);

    schoolModel.createClassroom(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  fetchClassrooms: (req, res) => {
    console.log(req.body);

    schoolModel.fetchClassrooms(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  searchUser: (req, res) => {
    console.log(req.body);

    schoolModel.searchUser(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  sendEmploymentRequest: (req, res) => {
    console.log(req.body);

    schoolModel.sendEmploymentRequest(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ message: error });
      }
    );
  },

  fetchEmploymentRequest: (req, res) => {
    console.log(req.body);

    schoolModel.fetchEmploymentRequest(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  searchStudent: (req, res) => {
    console.log(req.body);

    schoolModel.searchStudent(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  searchParent: (req, res) => {
    console.log(req.body);

    schoolModel.searchParent(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  searchStaff: (req, res) => {
    console.log(req.body);

    schoolModel.searchStaff(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  studentParentGroup: (req, res) => {
    console.log(req.body);

    schoolModel.studentParentGroup(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        console.log(error);
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchParentList: (req, res) => {
    console.log(req.body);

    schoolModel.fetchParentList(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchStaffList: (req, res) => {
    console.log(req.body);

    schoolModel.fetchStaffList(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchStudentParent: (req, res) => {
    console.log(req.body);

    schoolModel.fetchStudentParent(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchStudentTeacher: (req, res) => {
    console.log(req.body);

    schoolModel.fetchStudentTeacher(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  createSubject: (req, res) => {
    console.log(req.body);
    schoolModel.createSubject(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  editSubject: (req, res) => {
    console.log(req.body);
    schoolModel.editSubject(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchSubjects: (req, res) => {
    console.log(req.body);

    schoolModel.fetchSubjects(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  createRole: (req, res) => {
    console.log(req.body);

    schoolModel.createRole(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  fetchRoles: (req, res) => {
    console.log(req.body);

    schoolModel.fetchRoles(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.ok).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  assignRole: (req, res) => {
    console.log(req.body);

    schoolModel.assignRole(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },

  editRole: (req, res) => {
    console.log(req.body);

    schoolModel.editRole(req.body).then(
      (resp) => {
        console.log(resp);
        res.status(successful.created).send(resp);
      },
      (error) => {
        res.status(server_error.internal_server_error).send({ error });
      }
    );
  },
};
