import { ReactNode } from 'react';
import Link from 'next/link';
import { Link as ThemeLink } from 'theme-ui';

interface AppLinkProps {
  href: string;
  as?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  target?: string;
}

const AppLink = ({ href, as, children, ...rest }: AppLinkProps) => {
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  return isInternalLink ? (
    <Link {...{ href, as }} passHref>
      <ThemeLink {...rest}>{children}</ThemeLink>
    </Link>
  ) : (
    <a {...{ href, target: '_blank', rel: 'noopener noreferrer' }}>{children}</a>
  );
};

export default AppLink;
