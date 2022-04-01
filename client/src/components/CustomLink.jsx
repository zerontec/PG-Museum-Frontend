import { Link, useResolvedPath, useMatch } from 'react-router-dom'

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ color: match ? "rgb(70, 70, 70)" : "gray", fontSize: 21 , backgroundColor: match ? 'rgb(185, 185, 185, 0.23)' : '', borderRadius: '100px', padding: '5px', margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
