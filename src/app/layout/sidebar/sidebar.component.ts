import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = signal(false);

  menuItems = signal<MenuItem[]>([
    { 
      label: 'Dashboard', 
      icon: '📊', 
      route: '/dashboard' 
    },
    { 
      label: 'Create Bill', 
      icon: '📝', 
      route: '/home/billing' 
    },
    { 
      label: 'Clients', 
      icon: '👥', 
      children: [
        { label: 'All Clients', icon: '👥', route: '/clients' },
        { label: 'Add Client', icon: '➕', route: '/clients/add' },
        { label: 'Client Groups', icon: '🔖', route: '/clients/groups' }
      ],
      expanded: false
    },
    { 
      label: 'Products & Services', 
      icon: '🛍️', 
      children: [
        { label: 'Products', icon: '📦', route: '/products' },
        { label: 'Price Lists', icon: '💰', route: '/price-lists' }
      ],
      expanded: false
    },
    { 
      label: 'Payments', 
      icon: '💵', 
      route: '/payments' 
    },
    { 
      label: 'Reports', 
      icon: '📈', 
      children: [
        { label: 'Financial Reports', icon: '💲', route: '/reports/financial' },
        { label: 'Tax Reports', icon: '🧾', route: '/reports/tax' },
        { label: 'Client Reports', icon: '📋', route: '/reports/clients' }
      ],
      expanded: false
    },
    { 
      label: 'Settings', 
      icon: '⚙️', 
      route: '/settings' 
    }
  ]);
  
  // adminMenuItems = signal<MenuItem[]>([
  //   { 
  //     label: 'User Management', 
  //     icon: '👤', 
  //     route: '/admin/users' 
  //   },
  //   { 
  //     label: 'System Settings', 
  //     icon: '🔧', 
  //     route: '/admin/settings' 
  //   },
  //   { 
  //     label: 'Logs', 
  //     icon: '📜', 
  //     route: '/admin/logs' 
  //   }
  // ]);
  
  // Methods
  toggleSidebar() {
    this.isCollapsed.update(value => !value);
  }
  
  toggleMenuItem(item: MenuItem) {
    if (item.children?.length) {
      item.expanded = !item.expanded;
      
      // Update the signal to trigger change detection
      this.menuItems.update(items => [...items]);
    }
  }
  
  isActiveRoute(route?: string): boolean {
    if (!route) return false;
    // In a real implementation, this would compare with the current route
    // For demonstration, just return false
    return false;
  }
  
  isAdmin(): boolean {
    // This would check if the current user has admin privileges
    return true;
  }

}
