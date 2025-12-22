/**
 * Test Utilities
 *
 * Custom render function and utilities for testing React components.
 * Includes providers and common test helpers.
 */

import { render } from '@testing-library/react';

// Add any providers that wrap your app here
const AllProviders = ({ children }) => {
  return (
    // Add your providers here, e.g.:
    // <ThemeProvider>
    //   <AuthProvider>
    //     {children}
    //   </AuthProvider>
    // </ThemeProvider>
    <>{children}</>
  );
};

// Custom render that includes providers
const customRender = (ui, options) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Override render with custom render
export { customRender as render };

// Helper to wait for async operations
export const waitForAsync = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper to create mock responses
export const createMockResponse = (data, meta) => ({
  data,
  meta: meta || {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: Array.isArray(data) ? data.length : 1,
    },
  },
});

// Helper for testing accessibility
export const expectNoAccessibilityViolations = async (container) => {
  // If you have axe-core installed:
  // const { axe, toHaveNoViolations } = require('jest-axe');
  // expect.extend(toHaveNoViolations);
  // const results = await axe(container);
  // expect(results).toHaveNoViolations();

  // Basic accessibility checks without axe-core
  const images = container.querySelectorAll('img');
  images.forEach((img) => {
    expect(img).toHaveAttribute('alt');
  });

  const buttons = container.querySelectorAll('button');
  buttons.forEach((button) => {
    const hasText = button.textContent && button.textContent.trim();
    const hasAriaLabel = button.getAttribute('aria-label');
    expect(hasText || hasAriaLabel).toBeTruthy();
  });
};
