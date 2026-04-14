"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { App } from "antd";

function AntdConfig({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div style={{ visibility: "hidden" }}>{children}</div>;

  return (
    <ConfigProvider
      theme={{
        algorithm: resolvedTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <AntdConfig>{children}</AntdConfig>
    </NextThemesProvider>
  );
}