import { PROFILE_ROUTES } from '../../constants/route';
import SignOutButton from '../../components/SignOutButton';
import Link from 'next/link';
const UserSidebar = ({ session, profile, router }) => {
  return (
    <div className="auth--sidebar">
      <div className="auth-avt">
        <div className="auth-avt-image">
          <img src={profile.avatar_url} width={60} height={60} />
        </div>
        <div className="auth-account">{session?.user?.name}</div>
      </div>
      <div className="auth--menu">
        <ul>
          {PROFILE_ROUTES.map((route) => (
            <li key={route.id}>
              <Link href={route.path}>
                <a
                  className={`
                  ${
                    router.asPath === route.path
                      ? 'nav-link active'
                      : 'nav-link'
                  }`}
                >
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <SignOutButton classes="item"></SignOutButton>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default UserSidebar;
