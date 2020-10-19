export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      },
      {
        title: "LIMS",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "google-material",
        submenu: [
          {
            title: "New Request",
            page: "newrequest",
          },
          {
            title: "Folder List",
            page: "folderlist",
          },
        ]
      },
      // {
      //   title: "eFiles",
      //   root: true,
      //   page: "eFiles",
      // },
      // {
      //   title: "Form Builder",
      //   root: true,
      //   page: "formbuilder",
      // },
      {
        title: "Euclide",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "builder",
        submenu: [
          {
            title: "Lims",
            icon: "flaticon2-expand",
            page: "Lims"
          },
          {
            title: "Mail Server",
            icon: "flaticon2-envelope",
            page: "MailServer"
          },
          {
            title: "DB Configuration",
            icon: "flaticon-coins",
            page: "DB-Configuration"
          },
          {
            title: "Security Roles",
            icon: "flaticon-lock",
            page: "Security-Roles"
          },
          {
            title: "Users Configuration",
            icon: "flaticon-users",
            page: "User-Configuration"
          },
          {
            title: "Audit Configuration",
            icon: "flaticon-visible",
            page: "Audit-Configuration"
          },
          {
            title: "eFiles Configuration",
            icon: "flaticon-upload",
            page: "eFiles-Configuration"
          }
        ]
      },
      {
        title: "Issue Admin",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "builder",
        submenu: [
          {
            title: "Bug report",
            page: "BugReport"
          },
          {
            title: "Error Log",
            page: "ErrorLog"
          },
          {
            title: "Audit Log",
            page: "AuditLog"
          },
        ]
      },
    ]
  },
};
