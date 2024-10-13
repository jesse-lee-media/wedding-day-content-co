import { ReactNode } from 'react';

import { IconoirProvider } from 'iconoir-react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <IconoirProvider
      iconProps={{
        color: 'currentColor',
        strokeWidth: 2,
        width: '1.5rem',
        height: '1.5rem',
      }}
    >
      {children}
    </IconoirProvider>
  );
}
