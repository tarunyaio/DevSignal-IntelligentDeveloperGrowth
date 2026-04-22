/**
 * Sandboxed code execution using an iframe with restricted permissions.
 * Only JavaScript/TypeScript run client-side; other languages show a simulation message.
 */

const EXECUTION_TIMEOUT_MS = 5000;

function createSandboxHTML(code: string, language: string): string {
  const isTypeScript = language === 'typescript';
  
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <script src="https://unpkg.com/sucrase@3.34.0/dist/sucrase.js"></script>
  </head><body><script>
const __logs = [];
const console = {
  log: (...a) => __logs.push(a.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)).join(' ')),
  error: (...a) => __logs.push('Error: ' + a.join(' ')),
  warn: (...a) => __logs.push('Warning: ' + a.join(' ')),
  info: (...a) => __logs.push(a.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)).join(' ')),
};

try {
  let executableCode = \`${code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
  
  if (${isTypeScript}) {
    try {
      executableCode = window.sucrase.transform(executableCode, {
        transforms: ['typescript', 'imports'],
      }).code;
    } catch (e) {
      throw new Error('Transpilation Error: ' + e.message);
    }
  }

  // Wrap in async IIFE and run
  const script = document.createElement('script');
  script.textContent = \`
    (async () => {
      try {
        \${executableCode}
        window.parent.postMessage({ type: 'sandbox-result', output: __logs.join('\\\\n') || 'Code executed successfully with no output (try console.log).' }, '*');
      } catch (e) {
        window.parent.postMessage({ type: 'sandbox-result', output: 'Runtime error:\\\\n' + e.message }, '*');
      }
    })();
  \`;
  document.body.appendChild(script);
} catch (e) {
  window.parent.postMessage({ type: 'sandbox-result', output: 'System error:\\\\n' + e.message }, '*');
}
<${'/' + 'script'}></body></html>`;
}

export async function executeCode(code: string, language: string): Promise<string> {
  if (language !== 'javascript' && language !== 'typescript') {
    return `[Simulation Mode] Running ${language} code...\n\nServer-side execution for ${language} is not yet available.\n\nOutput:\nHello from the ${language} environment!`;
  }

  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.sandbox.add('allow-scripts');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const timer = setTimeout(() => {
      cleanup();
      resolve('Execution timed out after 5 seconds.');
    }, EXECUTION_TIMEOUT_MS);

    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('message', handler);
      iframe.remove();
    }

    function handler(event: MessageEvent) {
      if (event.data?.type === 'sandbox-result') {
        cleanup();
        resolve(String(event.data.output));
      }
    }

    window.addEventListener('message', handler);

    const html = createSandboxHTML(code, language);
    const blob = new Blob([html], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
  });
}
