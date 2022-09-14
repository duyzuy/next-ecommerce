import { useRouter } from 'next/router';
export const isActive = (path, depth) => {
  if (typeof depth !== 'number' || depth === 0) return;
  const router = useRouter();

  const currentPath = router.pathname;

  const arrayPathName = currentPath.split('/');
  const realPath = arrayPathName.splice(1, arrayPathName.length - 1);
  console.log(path, realPath);
  if (path === realPath[depth - 1]) {
    return true;
  }
  return false;
};
