import { Button, ColorSchemeScript, MantineProvider } from '@mantine/core';
import './global.css';
import '@mantine/core/styles.css';
import React from 'react';
import { theme } from '@/theme';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <div className="flex flex-col h-full">
            <div id="header" className="flex border-b h-16 px-10">
              <Button variant="white" style={{ height: '100%', minHeight: 60 }}>
                <p className="font-mono">Cellular Automata</p>
              </Button>
            </div>
            <div className="px-10 py-12 h-full">{children}</div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
