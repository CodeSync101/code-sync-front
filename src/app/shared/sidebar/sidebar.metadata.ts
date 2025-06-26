// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  submenu: RouteInfo[];
  roles?: ('STUDENT' | 'TEACHER' | 'ADMIN' | 'FIELD_MANAGER')[]; // Allowed roles for this menu item
}
