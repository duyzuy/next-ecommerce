import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const ProfileAccount = ({ className, isAuthenticated }) => {
  const clss = useMemo(() => {
    let cls = 'profile';
    if (className) {
      cls = cls.concat(' ', className);
    }
    return cls;
  }, [className]);
  return (
    <div className={clss}>
      <Link href={`/user/${(isAuthenticated && 'profile') || 'login'}`}>
        <a className="item">
          <Icon.User size={20} />
        </a>
      </Link>
      {(isAuthenticated && (
        <div className="user--dropdown">
          <ul>
            <li>
              <Link href="/user/profile">
                <a className="item">
                  <Icon.User size={20} /> Tài khoản
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user/profile">
                <a className="item">
                  <Icon.Inbox size={20} /> Đơn hàng
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user/profile">
                <a className="item">
                  <Icon.Map size={20} /> Địa chỉ
                </a>
              </Link>
            </li>
            <li>
              <button className="item" onClick={() => signOut('credentials')}>
                <Icon.LogOut size={20} /> Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(ProfileAccount);
