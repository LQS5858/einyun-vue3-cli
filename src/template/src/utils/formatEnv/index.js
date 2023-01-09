

export function formatEnv (env) {
  return {
    ...env,
    NODE_ENV: env?.['VITE_USER_NODE_ENV']
  }
}