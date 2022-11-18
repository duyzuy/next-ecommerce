import { signOut } from 'next-auth/react';
import * as Icon from 'react-feather';
const SignOutButton = ({ classes, label = 'Đăng xuất' }) => {
  return (
    <button className={`signout-btn ${classes}`} onClick={signOut}>
      {label}
      <Icon.LogOut size={20} />
    </button>
  );
};

export default SignOutButton;
