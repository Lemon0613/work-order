const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  uid: state => state.user.uid,
  options: state => state.projects.options,
  member: state => state.projects.options.member,
  jobtype: state => state.projects.options.jobtype,
  client: state => state.projects.options.client,
  projectList: state => state.projects.projectList,
  projectPageCount: state => state.projects.projectPageCount,
  projectInfoSearch: state => state.projects.projectInfoSearch,
  userInfo: state => state.staff.userInfo,
  client_status_options: () => [
    { key: 1, label: '前期' },
    { key: 2, label: '竞标' },
    { key: 3, label: '已签约' }
  ],
  urgency: () => [
    { key: 1, label: '正常' },
    { key: 2, label: '次要' },
    { key: 3, label: '重要' },
    { key: 4, label: '紧急' }
  ],
  // staus_options在客户设置和职位管理中有过调用。
  status_options: () => [
    { key: 1, label: '正常' },
    { key: 2, label: '禁用' }
  ]
}
export default getters
