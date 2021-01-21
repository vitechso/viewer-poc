import React from 'react';
import Link from 'next/link';
import siteConfig from '@ql/config/site.config';
import { IoIosFlash } from 'react-icons/io';

export default function ({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link href="/dashboard">
              <a>
                <IoIosFlash size={27} />
              </a>
            </Link>
          </h3>
        </div>
      ) : (
          <h3>
            <Link href="/dashboard">
              <a>{siteConfig.siteName}</a>
            </Link>
          </h3>
        )}
    </div>
  );
}
