const Sequelize = require("sequelize");
const sequelize = require("../../configs/connection");
const { Op } = require("sequelize");
const { _ } = require("lodash");
const User = require("../../models/auth/users")(sequelize, Sequelize);
const School = require("../../models/auth/schools")(sequelize, Sequelize);
const Student = require("../../models/schools/students")(sequelize, Sequelize);
const Subject = require("../../models/schools/subject")(sequelize, Sequelize);
const Role = require("../../models/schools/role")(sequelize, Sequelize);
const AssignedRole = require("../../models/schools/assigned_role")(
  sequelize,
  Sequelize
);
const Classroom = require("../../models/schools/classroom")(
  sequelize,
  Sequelize
);
const EmploymentRequest = require("../../models/schools/employment_request")(
  sequelize,
  Sequelize
);
const AcceptedEmploymentRequest =
  require("../../models/schools/accepted_employment_request")(
    sequelize,
    Sequelize
  );
const CancelledEmploymentRequest =
  require("../../models/schools/cancelled_employment_request")(
    sequelize,
    Sequelize
  );
const ConfirmedEmploymentRequest =
  require("../../models/schools/confirmed_employment_request")(
    sequelize,
    Sequelize
  );
const DeclinedEmploymentRequest =
  require("../../models/schools/declined_employment_request")(
    sequelize,
    Sequelize
  );
const EmploymentRequestNotification =
  require("../../models/notification/employment_request_notifications")(
    sequelize,
    Sequelize
  );

const StudentParentGroup = require("../../models/schools/student_parent_group")(
  sequelize,
  Sequelize
);

const ParentList = require("../../models/schools/parent_list")(
  sequelize,
  Sequelize
);

const StaffList = require("../../models/schools/staff_list")(
  sequelize,
  Sequelize
);

// Student.sync({ alter: true });
// Classroom.sync({ alter: true });
// EmploymentRequest.sync({ alter: true });
// AcceptedEmploymentRequest.sync({ alter: true });
// CancelledEmploymentRequest.sync({ alter: true });
// ConfirmedEmploymentRequest.sync({ alter: true });
// DeclinedEmploymentRequest.sync({ alter: true });
// StudentParentGroup.sync({ alter: true });
// ParentList.sync({ alter: true });
// StaffList.sync({ alter: true });
// Subject.sync({ alter: true });
// AssignedRole.sync({ alter: true });
// Role.sync({ alter: true });
// sequelize.drop();
// sequelize.sync({ force: true });

exports.schoolModel = {
  createStudent: (student) => {
    return new Promise((resolve, reject) => {
      Student.create(student).then(
        (student) => {
          resolve({ message: "created", student });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchClassStudents: ({ school_id, class_id }) => {
    return new Promise(async (resolve, reject) => {
      Student.findAll({ where: { school_id, class_id } }).then(
        (students) => {
          resolve(students);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  fetchSchoolStudents: ({ school_id }) => {
    return new Promise(async (resolve, reject) => {
      Student.findAll({ where: { school_id } }).then(
        (students) => {
          resolve(students);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  createClassroom: (classroom) => {
    return new Promise((resolve, reject) => {
      Classroom.create(classroom).then(
        (classroom) => {
          resolve({ message: "created", classroom });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchClassrooms: ({ school_id }) => {
    return new Promise(async (resolve, reject) => {
      Classroom.findAll({ where: { school_id } }).then(
        (classrooms) => {
          resolve(classrooms);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  searchUser: ({ keyword, user_type }) => {
    return new Promise(async (resolve, reject) => {
      let Model = user_type == 1 ? School : User;
      Model.findAll({
        where: {
          [Op.or]:
            user_type == 1
              ? [{ school_name: { [Op.iLike]: `%${keyword}%` } }]
              : [
                  { first_name: { [Op.iLike]: `%${keyword}%` } },
                  { last_name: { [Op.iLike]: `%${keyword}%` } },
                  { other_name: { [Op.iLike]: `%${keyword}%` } },
                  { username: { [Op.iLike]: `%${keyword}%` } },
                ],
        },
        limit: 10,
      }).then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  searchStudent: ({ keyword, school_id }) => {
    return new Promise(async (resolve, reject) => {
      Student.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${keyword}%` } },
            { last_name: { [Op.iLike]: `%${keyword}%` } },
          ],
          school_id,
        },
        limit: 20,
      }).then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  searchParent: ({ keyword }) => {
    return new Promise(async (resolve, reject) => {
      User.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${keyword}%` } },
            { last_name: { [Op.iLike]: `%${keyword}%` } },
            { other_name: { [Op.iLike]: `%${keyword}%` } },
            { username: { [Op.iLike]: `%${keyword}%` } },
          ],
        },
        limit: 10,
      }).then(
        (result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  searchStaff: ({ school_id, keyword }) => {
    return new Promise(async (resolve, reject) => {
      User.findAll({
        where: {
          [Op.or]: [
            { first_name: { [Op.iLike]: `%${keyword}%` } },
            { last_name: { [Op.iLike]: `%${keyword}%` } },
            { other_name: { [Op.iLike]: `%${keyword}%` } },
            { username: { [Op.iLike]: `%${keyword}%` } },
          ],
        },
        limit: 5,
      }).then(
        (result) => {
          console.log(result);
          let staffs = [];
          result.map(async (res, index) => {
            let user_id = res.dataValues.id;
            let fetchStaff = await StaffList.findOne({
              where: { school_id, user_id },
            });
            fetchStaff && staffs.push(res.dataValues);
            index == result.length - 1 && resolve(staffs);
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  sendEmploymentRequest: (request) => {
    return new Promise(async (resolve, reject) => {
      const recipient = await User.findOne({
        where: { id: request.recipient_id },
      });
      if (recipient.dataValues.current_role == "Open to work") {
        EmploymentRequest.findOne({
          where: {
            school_id: request.school_id,
            recipient_id: request.recipient_id,
            status: { [Op.in]: ["accepted", "pending", "completed"] },
          },
        }).then(async (emp) => {
          if (emp && request.status == "pending") {
            resolve({
              message:
                "Request already initiated. Either waiting for recipient to respond or recipient already accepted your request.",
            });
          } else {
            if (request.status == "pending") {
              EmploymentRequest.create({
                school_id: request.school_id,
                recipient_id: request.recipient_id,
                status: request.status,
                staff_id: request.staff_id,
                staff_type: request.staff_type,
              }).then(
                async (employment) => {
                  await EmploymentRequestNotification.create({
                    user_id: request.recipient_id,
                    school_id: request.school_id,
                    request_id: employment.dataValues.id,
                  });
                  resolve({ message: "created", employment });
                },
                (err) => {
                  reject({ error: err });
                }
              );
            } else {
              let Model =
                request.status == "cancelled"
                  ? CancelledEmploymentRequest
                  : request.status == "accepted"
                  ? AcceptedEmploymentRequest
                  : request.status == "declined"
                  ? DeclinedEmploymentRequest
                  : ConfirmedEmploymentRequest;

              Model.create({
                request_id: request.request_id,
                status: request.status,
                staff_id: request.staff_id,
                staff_type: request.staff_type,
              }).then(
                async (employment) => {
                  await EmploymentRequest.update(
                    { status: request.status },
                    { where: { id: request.request_id } }
                  );
                  await EmploymentRequestNotification.create({
                    user_id: request.recipient_id,
                    school_id: request.school_id,
                    request_id: request.request_id,
                  });

                  if (
                    request.status == "declined" ||
                    request.status == "accepted"
                  ) {
                    await EmploymentRequestNotification.update(
                      { responded: true },
                      { where: { id: request.notification_id } }
                    );
                  }

                  if (request.status == "confirmed") {
                    const school = await School.findOne({
                      where: { id: request.school_id },
                      attributes: ["school_name"],
                    });
                    await User.update(
                      {
                        current_role: "Staff",
                        current_employer: school.dataValues.school_name,
                      },
                      { where: { id: request.recipient_id } }
                    );
                    await StaffList.create({
                      school_id: request.school_id,
                      user_id: request.recipient_id,
                      staff_id: request.staff_id,
                      staff_type: request.staff_type,
                    });
                  }
                  resolve({ message: request.status, employment });
                },
                (err) => {
                  reject({ error: err });
                }
              );
            }
          }
        });
      } else {
        resolve({
          message:
            "User is currently employed. Tell them to resign from their current role first. Thanks",
        });
      }
    });
  },

  fetchEmploymentRequest: ({ start, length, school_id, status }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasMany(EmploymentRequest, { foreignKey: "recipient_id" });
      EmploymentRequest.belongsTo(User, { foreignKey: "recipient_id" });
      EmploymentRequest.findAll({
        where: { school_id, status },
        include: [User],
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (requests) => {
          console.log(requests);
          resolve(requests);
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  studentParentGroup: (group) => {
    return new Promise(async (resolve, reject) => {
      let updateId = 0;
      let exData = {};
      let updateData = {};
      const existingGroup = await StudentParentGroup.findAll({
        where: { school_id: group.school_id },
      });
      // console.log(existingGroup);
      await existingGroup.map((exGroup) => {
        let groupId = exGroup.dataValues.id;
        let xgroup = exGroup.dataValues.group;
        xgroup = JSON.parse(xgroup);

        let ingroup = group.group[0];
        console.log(groupId, xgroup);
        console.log(groupId, ingroup);

        const foundParent = ingroup.parents.some(
          (p) => xgroup.parents.indexOf(p) >= 0
        );
        const foundStudent = ingroup.students.some(
          (s) => xgroup.students.indexOf(s) >= 0
        );
        if (foundParent || foundStudent) {
          updateId = groupId;
          updateData = ingroup;
          exData = xgroup;
        }
      });

      console.log("UpdateData " + updateId, updateData);
      if (updateId == 0) {
        StudentParentGroup.create(group).then(
          async (createdGroup) => {
            await group.group[0].parents.map(async (parent_id, i) => {
              let parent = {
                school_id: group.school_id,
                parent_id,
                staff_id: group.staff_id,
                staff_type: group.staff_type,
              };
              const checkParent = await ParentList.findOne({
                where: {
                  parent_id: parent.parent_id,
                  school_id: parent.school_id,
                },
              });
              !checkParent && (await ParentList.create(parent));
              if (i == group.group[0].parents.length - 1) {
                resolve({ message: "created", createdGroup });
              }
            });
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        if (JSON.stringify(exData) == JSON.stringify(updateData)) {
          resolve({ message: "This exact group already exists" });
        } else {
          let data = [
            {
              parents: _.union(exData.parents, updateData.parents),
              students: _.union(exData.students, updateData.students),
            },
          ];
          console.log("Updating value", data);
          StudentParentGroup.update(
            { group: data },
            { where: { id: updateId } }
          ).then(
            async (updatedGroup) => {
              await data[0].parents.map(async (parent_id, i) => {
                let parent = {
                  school_id: group.school_id,
                  parent_id,
                  staff_id: group.staff_id,
                  staff_type: group.staff_type,
                };
                const checkParent = await ParentList.findOne({
                  where: {
                    parent_id: parent.parent_id,
                    school_id: parent.school_id,
                  },
                });
                !checkParent && (await ParentList.create(parent));
                if (i == data[0].parents.length - 1) {
                  resolve({ message: "created", updatedGroup });
                }
              });
            },
            (err) => {
              reject(err);
            }
          );
        }
      }
    });
  },

  fetchStaffList: ({ start, length, school_id, staff_id, staff_type }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasOne(EmploymentRequest, { foreignKey: "recipient_id" });
      EmploymentRequest.belongsTo(User, { foreignKey: "recipient_id" });
      EmploymentRequest.findAll({
        where: { school_id, status: "confirmed" },
        include: User,
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (requests) => {
          console.log(requests);
          let staffs = [];
          if (requests.length > 0) {
            await requests.map((request, i) => {
              staffs.push(request.dataValues.user);

              if (i == requests.length - 1) {
                resolve(staffs);
              }
            });
          } else {
            resolve(staffs);
          }
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchParentList: ({ start, length, school_id, staff_id, staff_type }) => {
    return new Promise((resolve, reject) => {
      const pagination =
        start == 0 ? { limit: length } : { offset: start, limit: length };

      User.hasOne(ParentList, { foreignKey: "parent_id" });
      ParentList.belongsTo(User, { foreignKey: "parent_id" });
      ParentList.findAll({
        where: { school_id },
        include: User,
        order: [["id", "DESC"]],
        ...pagination,
      }).then(
        async (results) => {
          console.log(results);
          let parents = [];
          await results.map((result, i) => {
            parents.push(result.dataValues.user);

            if (i == results.length - 1) {
              resolve(parents);
            }
          });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchStudentParent: ({ employer_id, student_id }) => {
    return new Promise(async (resolve, reject) => {
      let schoolId = employer_id;
      await StudentParentGroup.findOne({
        where: { school_id: schoolId },
        attributes: ["group"],
      }).then(
        async (group) => {
          console.log("Group", JSON.parse(group.dataValues.group));
          const myGroup = JSON.parse(group.dataValues.group);
          const isStudentId = myGroup.students.find(
            (studentId) => studentId == student_id
          );
          let myParents = isStudentId ? myGroup.parents : [];
          const myParentsId = [...myParents];
          console.log("MyParentsId", myParentsId);
          const parents = await User.findAll({
            where: {
              id: myParentsId,
            },
          });
          resolve(parents);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  fetchStudentTeacher: ({ school_id, student_id }) => {
    return new Promise(async (resolve, reject) => {
      const student = await Student.findOne({
        where: { id: student_id },
        attributes: ["class_id"],
      });
      console.log(student);
      const class_id = student.dataValues.class_id;
      let accesses = [];
      let roleId = 0;

      const roles = await Role.findAll({
        where: { school_id },
        attributes: ["id", "access"],
      });
      console.log("Roles", roles);

      await roles.map(async (role) => {
        const access = role.dataValues.access;
        const role_id = role.dataValues.id;
        await access.map((acc) => {
          accesses.push({ ...JSON.parse(acc), role_id });
        });
      });
      console.log("Accesses", accesses);

      accesses.map((acc) => {
        if (acc.access_name == "class_teacher" && acc.class_id == class_id) {
          roleId = acc.role_id;
        }
      });

      console.log(roleId);
      await AssignedRole.findOne({
        where: { role_id: roleId },
        attributes: ["user_id"],
      }).then(
        async (role) => {
          console.log(role);
          await User.findOne({ where: { id: role.dataValues.user_id } }).then(
            (user) => {
              resolve(user);
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  createSubject: (subject) => {
    return new Promise(async (resolve, reject) => {
      const sub = await Subject.findOne({
        where: {
          school_id: subject.school_id,
          subject_name: subject.subject_name,
        },
      });
      console.log(sub);
      if (sub) {
        resolve({ message: "Subject already exists!" });
      } else {
        Subject.create(subject).then(
          (subject) => {
            resolve({ message: "created", subject });
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  editSubject: ({ subject_id, subject_name, alias, class_ids }) => {
    return new Promise(async (resolve, reject) => {
      Subject.update(
        { subject_name, alias, class_ids },
        { where: { id: subject_id } }
      ).then(
        (subject) => {
          resolve({ message: "created" });
        },
        (err) => {
          reject({ error: err });
        }
      );
    });
  },

  fetchSubjects: ({ school_id }) => {
    return new Promise(async (resolve, reject) => {
      Subject.findAll({ where: { school_id } }).then(
        (subjects) => {
          resolve(subjects);
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  createRole: (role) => {
    return new Promise(async (resolve, reject) => {
      const rol = await Role.findOne({
        where: {
          school_id: role.school_id,
          role_name: role.role_name,
        },
      });
      console.log(rol);
      if (rol) {
        resolve({ message: "Role already exists!" });
      } else {
        Role.create(role).then(
          (role) => {
            resolve({ message: "created", role });
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  fetchRoles: ({ school_id }) => {
    return new Promise(async (resolve, reject) => {
      Role.findAll({ where: { school_id } }).then(
        async (roles) => {
          await roles.map(async (role, index) => {
            role.dataValues.access = await role.dataValues.access.map((r) =>
              JSON.parse(r)
            );
            if (index == roles.length - 1) {
              resolve(roles);
            }
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  },

  assignRole: (role) => {
    return new Promise(async (resolve, reject) => {
      const existingRole = await AssignedRole.findOne({
        where: {
          school_id: role.school_id,
          user_id: role.user_id,
        },
      });
      console.log(existingRole);
      if (existingRole) {
        console.log("Want to update");
        AssignedRole.update(
          { role_id: role.role_id },
          {
            where: {
              school_id: role.school_id,
              user_id: role.user_id,
            },
          }
        ).then(
          (role) => {
            resolve({ message: "created", role });
          },
          (err) => {
            reject({ error: err });
          }
        );
      } else {
        console.log("Want to create");
        AssignedRole.create(role).then(
          (role) => {
            resolve({ message: "created", role });
          },
          (err) => {
            reject({ error: err });
          }
        );
      }
    });
  },

  editRole: (role) => {
    return new Promise(async (resolve, reject) => {
      const rol = await Role.update(
        { role_name: role.role_name, access: role.access },
        {
          where: {
            school_id: role.school_id,
            id: role.role_id,
          },
        }
      );
      console.log(rol);
      if (rol) {
        resolve({ message: "Role updated successfully!" });
      } else {
        reject({ mesage: "An error occured!" });
      }
    });
  },
};
