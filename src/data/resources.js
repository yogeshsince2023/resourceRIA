export const resources = {
  year1: {
    label: "Year 1",
    branches: {
      "Physics Group": {
        semesters: {
          "Semester 1": [
            { name: "Engineering Mathematics I", links: [{ type: "pyq", url: "#" }, { type: "notes", url: "#" }] },
            { name: "Engineering Physics", links: [{ type: "video", url: "#" }, { type: "notes", url: "#" }] }
          ],
          "Semester 2": [
            { name: "Engineering Mathematics II", links: [{ type: "pyq", url: "#" }] },
            { name: "Basic Electrical Engineering", links: [{ type: "notes", url: "#" }] }
          ]
        }
      },
      "Chemistry Group": {
        semesters: {
          "Semester 1": [
            { name: "Engineering Mathematics I", links: [{ type: "notes", url: "#" }] },
            { name: "Engineering Chemistry", links: [{ type: "pyq", url: "#" }, { type: "video", url: "#" }] }
          ],
          "Semester 2": [
            { name: "Engineering Mathematics II", links: [] },
            { name: "Programming for Problem Solving", links: [{ type: "video", url: "#" }] }
          ]
        }
      }
    }
  },
  year2: {
    label: "Year 2",
    branches: {
      "Computer Engineering": {
        semesters: {
          "Semester 3": [
            { name: "Data Structures", links: [{ type: "video", url: "#" }, { type: "notes", url: "#" }] },
            { name: "Digital Logic Design", links: [{ type: "pyq", url: "#" }] }
          ],
          "Semester 4": [
            { name: "Operating Systems", links: [{ type: "notes", url: "#" }] },
            { name: "Object Oriented Programming", links: [{ type: "video", url: "#" }] },
            { name: "Computer Organization", links: [{ type: "notes", url: "#" }] }
          ]
        }
      },
      "Information Technology": {
        semesters: {
          "Semester 3": [
            { name: "Data Structures", links: [] },
            { name: "Digital Logic Design", links: [{ type: "pyq", url: "#" }] }
          ],
          "Semester 4": [
            { name: "Operating Systems", links: [] },
            { name: "Computer Networks", links: [] }
          ]
        }
      }
    }
  },
  year3: {
    label: "Year 3",
    branches: {
      "Computer Engineering": {
        semesters: {
          "Semester 5": [
            { name: "Database Management Systems", links: [{ type: "notes", url: "#" }] },
            { name: "Theory of Computation", links: [{ type: "pyq", url: "#" }, { type: "video", url: "#" }] }
          ],
          "Semester 6": [
            { name: "Software Engineering", links: [{ type: "notes", url: "#" }] },
            { name: "Computer Networks", links: [{ type: "video", url: "#" }] }
          ]
        }
      }
    }
  },
  year4: {
    label: "Year 4",
    branches: {
      "Computer Engineering": {
        semesters: {
          "Semester 7": [
            { name: "Machine Learning", links: [{ type: "pyq", url: "#" }] },
            { name: "Information Security", links: [{ type: "notes", url: "#" }] }
          ],
          "Semester 8": [
            { name: "Cloud Computing", links: [{ type: "video", url: "#" }] },
            { name: "Project Work", links: [] }
          ]
        }
      }
    }
  }
};
