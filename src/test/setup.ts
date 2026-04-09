import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Testing Library matchers ko Vitest ke expect ke saath extend karein
expect.extend(matchers)

// Har test ke baad cleanup ensure karein takki koi leak na ho
afterEach(() => {
  cleanup()
})
