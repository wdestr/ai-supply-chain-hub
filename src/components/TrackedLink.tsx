'use client';

import { usePathname } from 'next/navigation';

interface TrackedLinkProps {
  href: string;
  affiliateHref?: string | null;
  resourceType: 'tool' | 'platform';
  resourceId: string;
  resourceName: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function TrackedLink({
  href,
  affiliateHref,
  resourceType,
  resourceId,
  resourceName,
  children,
  className = '',
  ariaLabel,
}: TrackedLinkProps) {
  const pathname = usePathname();
  const isAffiliate = !!affiliateHref;
  const destination = affiliateHref || href;

  function handleClick() {
    // Fire-and-forget tracking beacon
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resource_type: resourceType,
        resource_id: resourceId,
        resource_name: resourceName,
        click_type: isAffiliate ? 'affiliate' : 'outbound',
        referrer_path: pathname,
      }),
    }).catch(() => {});
  }

  return (
    <a
      href={destination}
      target="_blank"
      rel={isAffiliate ? 'noopener sponsored' : 'noopener noreferrer'}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
