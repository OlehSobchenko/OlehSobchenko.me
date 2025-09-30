// Minimal browser-friendly shim for `clean-stack` used by decap-cms-core ErrorBoundary
// In the browser we can just return the stack unchanged to avoid importing Node-only modules like `node:url`.
export default function cleanStack(stack?: string): string | undefined {
  return stack;
}
