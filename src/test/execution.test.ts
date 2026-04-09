import { describe, it, expect, vi } from 'vitest'
import { executeCode } from '@/lib/execution'

describe('executeCode', () => {
  it('returns simulation message for non-JS languages', async () => {
    const result = await executeCode('print("hello")', 'python')
    expect(result).toContain('Simulation Mode')
    expect(result).toContain('python')
  })

  it('executes JavaScript in sandboxed iframe', async () => {
    // Mock DOM APIs for jsdom
    const mockIframe = {
      sandbox: { add: vi.fn() },
      style: {},
      src: '',
      remove: vi.fn(),
    }
    vi.spyOn(document, 'createElement').mockReturnValue(mockIframe as unknown as HTMLElement)
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockIframe as unknown as Node)
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock')

    // Simulate postMessage from sandbox
    const messagePromise = executeCode("console.log('hello')", 'javascript')
    
    // Fire the message event
    const event = new MessageEvent('message', {
      data: { type: 'sandbox-result', output: 'hello' }
    })
    window.dispatchEvent(event)

    const result = await messagePromise
    expect(result).toBe('hello')
    expect(mockIframe.sandbox.add).toHaveBeenCalledWith('allow-scripts')
  })
})
