import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    rules: {
      "*.dat": {
        loaders: ["file-loader"],
      },
      "*.wasm": {
        loaders: ["wasm-loader"],
      },
    },
  },
  webpack: (config, { isServer }) => {
    // Add loaders for different file types
    config.module.rules.push({
      test: /\.dat$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    // Configure experiments for WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    if (!isServer) {
      // Fallback for Node.js built-ins
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        module: false,
        dns: false,
        env: false,
        wasi_snapshot_preview1: false,
        "node:fs": false,
        "node:util": false,
        "node:net": false,
        "node:http": false,
        "node:path": false,
        "node:crypto": false,
        "node:stream": false,
        "node:buffer": false,
        "node:url": false,
        "node:querystring": false,
        "node:os": false,
        "node:events": false,
        "node:assert": false,
        "node:process": false,
        "node:child_process": false,
        "node:cluster": false,
        "node:dgram": false,
        "node:tty": false,
        "node:worker_threads": false,
        "node:zlib": false,
        "node:readline": false,
        "node:perf_hooks": false,
        "node:v8": false,
        "node:vm": false,
        "node:timers": false,
        "node:constants": false,
        "node:module": false,
        "node:inspector": false,
        "node:repl": false,
        "node:string_decoder": false,
        "node:trace_events": false,
        "node:diagnostics_channel": false,
        "node:async_hooks": false,
        "node:wasi": false,
        "node:worker": false,
        "node:console": false,
        "node:domain": false,
        "node:punycode": false,
        "node:https": false,
        "node:http2": false,
        "node:tls": false,
        "node:dns": false,
      };
      
      // Mark packages as external for client-side
      config.externals = config.externals || [];
      config.externals.push(
        'wordpress-playground-handler',
        '@php-wasm/node',
        '@php-wasm/web',
        '@wp-playground/storage',
        'fs',
        'net',
        'tls',
        'module',
        'dns',
        'env',
        'wasi_snapshot_preview1'
      );
    } else {
      // For server-side, exclude @php-wasm/web completely
      config.externals = config.externals || [];
      config.externals.push('@php-wasm/web');
    }

    return config;
  },
  serverExternalPackages: [
    'wordpress-playground-handler',
    '@php-wasm/node',
    '@php-wasm/web',
    '@wp-playground/storage',
  ],
};

export default nextConfig;
