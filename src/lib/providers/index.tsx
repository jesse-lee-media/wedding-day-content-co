import { IconoirProvider } from 'iconoir-react';

export default function Providers({ children }: { children: React.ReactNode }) {
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
