import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiBookOpen,

  FiBriefcase,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
} from 'react-icons/fi';
import styles from '../styles/components/AdimHomePage/Sidebar.module.css';

const Sidebar = ({ activePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/admin' },
    { name: 'Users', icon: <FiUsers />, path: '/admin/users' },


 {
      name: 'Courses',
      icon: <FiBookOpen/>,
      dropdown: true,
      children: [
        {
          name: 'create_course',
          path: '/courses_create',
        },
        {
          name: 'Courses Details',
          path: '/courses',
        },
      ],
    },


    {
      name: 'Newbatch',
      icon: <FiBookOpen/>,
      dropdown: true,
      children: [
        {
          name: 'Create New Batch',
          path: '/createnewbatch',
        },
        {
          name: 'Batch Details',
          path: '/admin/batchdetails',
        },
      ],
    },

    {
      name: 'jobnotification',
      icon: <FiBookOpen/>,
      dropdown: true,
      children: [
        {
          name: 'createjobnotification',
          path: '/createjobnotification',
        },
        {
          name: 'jobnotification Details',
          path: '/jobnotification',
        },
      ],
    },


 {
      name: 'Internships',
      icon: <FiBriefcase />,
      dropdown: true,
      children: [
        {
          name: 'create Internship',
          path: '/admin/create_internship',
        },
        {
          name: 'internship Details',
          path: '/internship',
        },
      ],
    },


    {
      name: 'Applications',
      icon: <FiFileText />,
      dropdown: true,
      children: [
        {
          name: 'Internship Applications',
          path: '/admin/internship_applications',
        },
        {
          name: 'Course Applications',
          path: '/admin/course_enrolled_users',
        },
      ],
    },

    { name: 'Analytics', icon: <FiBarChart2 />, path: '/admin/analytics' },
    { name: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
  ];

  const handleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        {collapsed ? 'AP' : 'AdminPanel'}
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      {/* Menu */}
      <ul className={styles.menu}>
        {menuItems.map((item) =>
          item.dropdown ? (
            <li key={item.name} className={styles.dropdownBlock}>
              <div
                className={styles.menuItem}
                onClick={() => handleDropdown(item.name)}
              >
                <span className={styles.icon}>{item.icon}</span>
                {!collapsed && <span className={styles.text}>{item.name}</span>}
                {!collapsed && (
                  <FiChevronDown
                    className={`${styles.arrow} ${
                      openDropdown === item.name ? styles.rotate : ''
                    }`}
                  />
                )}
              </div>

              {!collapsed && openDropdown === item.name && (
                <ul className={styles.dropdown}>
                  {item.children.map((child) => (
                    <li
                      key={child.name}
                      className={styles.dropdownItem}
                      onClick={() => navigate(child.path)}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`${styles.menuItem} ${
                activePage === item.name.toLowerCase() ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {!collapsed && <span className={styles.text}>{item.name}</span>}
            </li>
          )
        )}
      </ul>

      {/* Profile */}
      {!collapsed && (
        <div className={styles.profile}>
          <img src="/avatar.png" alt="Admin" />
          <span>Admin</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
