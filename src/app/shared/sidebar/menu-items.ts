import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/component/chatbot',
    title: 'Chat with Esprit',
    icon: 'bi bi-chat-dots',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/component/users',
    title: 'Users Management',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['ADMIN']
  },
  {
    path: '/component/organizations',
    title: 'Organizations',
    icon: 'bi bi-building',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['ADMIN', 'FIELD_MANAGER']
  },
  {
    path: '/component/repositories',
    title: 'Groups Management',
    icon: 'bi bi-git',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['ADMIN', 'FIELD_MANAGER', 'TEACHER']
  },
  {
    path: '/component/badges',
    title: 'Rapport',
    icon: 'bi bi-patch-check',
    class: '',
    extralink: false,
    submenu: [],
    roles: ['ADMIN', 'FIELD_MANAGER', 'TEACHER']
  },
  {
    path: '/component/dropdown',
    title: 'AbdRahim',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/matieres',
    title: 'Projet',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/notes',
    title: 'Mes Notes',
    icon: 'bi bi-mortarboard-fill',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/reclamations',
    title: 'Liste des réclamations',
    icon: 'bi bi-list-ul',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/reclamations/add',
    title: 'Ajouter une réclamation',
    icon: 'bi bi-plus-circle',
    class: '',
    extralink: false,
    submenu: []
  }
];
