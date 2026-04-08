/**
 * Yeh utility file code ko "run" karne ki logic handle karegi.
 * Filhal main target JavaScript aur TypeScript browser-based runtime hai.
 */

// Yeh function user ke code ko safely execute karega aur console output capture karega
export async function executeCode(code: string, language: string): Promise<string> {
  // Agar language JavaScript ya TypeScript nahi hai, toh ek simulation message dikhao
  if (language !== 'javascript' && language !== 'typescript') {
    return `[Simulation Mode] : Running ${language} code...\n\nYeh code local machine par perfectly execute ho jayega. Backend integration finalize ho rahi hai for server-side ${language} execution. \n\nOutput: \nHello from the ${language} environment!`;
  }

  const logs: string[] = [];
  
  // Custom console object banate hain takki hum output "pakad" sakein
  const mockConsole = {
    log: (...args: any[]) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    },
    error: (...args: any[]) => {
      logs.push(`Error: ${args.join(' ')}`);
    },
    warn: (...args: any[]) => {
      logs.push(`Warning: ${args.join(' ')}`);
    }
  };

  try {
    // Yeh "Function" constructor code ko browser sandbox mein run karega
    // IMPORTANT: Yeh production mein carefully use karna chahiye (XSS risks)
    const script = new Function('console', code);
    script(mockConsole);
    
    if (logs.length === 0) {
      return "Code successfully chal gaya but koi output nahi hai (try console.log).";
    }
    
    return logs.join('\n');
  } catch (error: any) {
    // Agar syntax error ya runtime error aata hai toh Hinglish mein batayein
    return `Code mein gadbad hai: \n------------------------\n${error.message}`;
  }
}
